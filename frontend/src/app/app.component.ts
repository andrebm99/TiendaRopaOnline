import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { User } from './core/models/user.model';
import { filter } from 'rxjs/operators';

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
  showLayout = true;
  isMobileMenuOpen = false;
  isUserDropdownOpen = false;

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleUserDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  @HostListener('document:click')
  closeDropdowns(): void {
    this.isUserDropdownOpen = false;
  }

  ngOnInit(): void {
    // Ocultar Navbar y Footer si la ruta pertenece a AuthModule
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showLayout = !event.urlAfterRedirects.startsWith('/auth');
    });

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
