import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-bolsa',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.scss']
})
export class BolsaComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  loading: boolean = false;

  // 1. Creamos una variable para almacenar el usuario logueado
  usuarioLogueado: any = null;

  constructor(
    private readonly cartService: CartService,
    private readonly pedidoService: PedidoService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Escuchar cambios reactivos en la bolsa
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });

    // 2. Nos suscribimos al usuario actual desde el AuthService
    this.authService.currentUser$.subscribe(user => {
      this.usuarioLogueado = user;
    });
  }

  incrementQuantity(item: CartItem): void {
    if (item.producto.id) {
      this.cartService.updateQuantity(item.producto.id, item.cantidad + 1);
    }
  }

  decrementQuantity(item: CartItem): void {
    if (item.producto.id && item.cantidad > 1) {
      this.cartService.updateQuantity(item.producto.id, item.cantidad - 1);
    }
  }

  removeItem(item: CartItem): void {
    if (item.producto.id) {
      this.cartService.removeFromCart(item.producto.id);
    }
  }

  // Registrar órdenes de compra en paralelo en Spring Boot
  onPayOrder(): void {
    if (this.cartItems.length === 0) {
      return;
    }

    this.loading = true;

    // 3. Usamos la variable que ya guardamos en el ngOnInit
    const nombreFinal = this.usuarioLogueado?.nombre || this.usuarioLogueado?.username || 'Usuario Desconocido';
    const emailFinal = this.usuarioLogueado?.email || 'Email Desconocido';

    const itemsValidos = this.cartItems.filter(item => item.producto.id != null && item.producto.id !== undefined);

    if (itemsValidos.length !== this.cartItems.length) {
      console.error('Bolsa actual:', this.cartItems);
      alert('Error de sincronización: Algunos productos en tu bolsa perdieron su ID. Por favor, vacía la bolsa y vuelve a agregarlos.');
      this.loading = false;
      return;
    }

    const requests = itemsValidos.map(item => {
      return this.pedidoService.crearPedido({
        clienteNombre: nombreFinal,
        clienteEmail: emailFinal,
        productoId: item.producto.id!,
        cantidad: item.cantidad
      });
    });

    forkJoin(requests).subscribe({
      next: () => {
        this.loading = false;
        alert('¡Compra registrada con éxito! El pedido ha sido procesado.');
        this.cartService.clearCart();
      },
      error: () => {
        this.loading = false;
        alert('Hubo un problema al registrar su pedido en la base de datos.');
      }
    });
  }
}
