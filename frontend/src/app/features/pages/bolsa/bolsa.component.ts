import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { forkJoin } from 'rxjs';

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

  constructor(
    private readonly cartService: CartService,
    private readonly pedidoService: PedidoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Escuchar cambios reactivos en la bolsa
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
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
    
    const requests = this.cartItems.map(item => {
      return this.pedidoService.crearPedido({
        clienteNombre: 'Cliente Final',
        clienteEmail: 'cliente@tienda.com',
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
