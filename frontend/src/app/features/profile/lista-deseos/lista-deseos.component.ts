import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Producto } from '../../../core/models/producto.model';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-lista-deseos',
  standalone: false,
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.scss']
})
export class ListaDeseosComponent implements OnInit {
  // Inicializada vacía por defecto para nuevos usuarios
  wishlistItems: Producto[] = [];

  mensajeAgregado: string | null = null;
  private currentUser: User | null = null;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.email) {
        this.profileService.obtenerDatosUsuario(user.email).subscribe(datos => {
          this.currentUser = datos;
          if (datos.wishlistJson) {
            try {
              this.wishlistItems = JSON.parse(datos.wishlistJson);
            } catch (e) {
              this.wishlistItems = [];
            }
          } else {
            this.wishlistItems = [];
          }
        });
      }
    });
  }

  // Quitar un producto de la lista de deseos
  removerItem(id: number | undefined): void {
    if (!id) return;
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
    this.persistirWishlist();
  }

  // Agregar el producto al carrito global y mostrar feedback temporal
  agregarAlCarrito(producto: Producto): void {
    this.cartService.addToCart(producto, 1);
    
    // Solo mostrar confirmación si el usuario está autenticado (si no, cartService lo redirige)
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.mensajeAgregado = `¡${producto.nombre} AÑADIDO A LA BOLSA!`;
        setTimeout(() => {
          this.mensajeAgregado = null;
        }, 2500);
      }
    }).unsubscribe();
  }

  // Redirigir a la tienda
  irALaTienda(): void {
    this.router.navigate(['/catalogo']);
  }

  private persistirWishlist(): void {
    if (this.currentUser && this.currentUser.id) {
      const json = JSON.stringify(this.wishlistItems);
      // Enviar actualización del perfil con la nueva lista de deseos
      this.profileService.actualizarPerfil(this.currentUser.id, {
        ...this.currentUser,
        wishlistJson: json
      }).subscribe(updatedUser => {
        this.currentUser = updatedUser;
      });
    }
  }
}
