import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;
  cartCount: number = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Escuchar el estado de autenticación global
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Escuchar cambios en la bolsa de compras para el contador numérico
    this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getTotalItemsCount();
    });
  }

  // Cerrar sesión y redirigir
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
