import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-account-layout',
  standalone: false,
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {
  usuario: User | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Escuchar cambios en el usuario autenticado
    this.authService.currentUser$.subscribe(user => {
      this.usuario = user;
    });
  }

  // Cerrar sesión y redirigir
  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Volver a la página principal
  volver(): void {
    this.router.navigate(['/']);
  }
}
