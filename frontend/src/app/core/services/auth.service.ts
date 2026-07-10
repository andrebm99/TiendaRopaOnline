import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Estado reactivo global de la sesión del usuario
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly apiService: ApiService) {
    this.checkLocalStorageSession();
  }

  // Enviar credenciales a la API de Spring Boot
  login(credentials: any): Observable<any> {
    return this.apiService.post<{ token: string }>('auth/login', credentials).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.setCurrentUserFromToken(res.token);
        }
      })
    );
  }

  // Registrar un nuevo usuario en la base de datos
  register(userData: any): Observable<any> {
    return this.apiService.post<any>('user', userData);
  }

  // Cerrar la sesión del usuario limpiando el almacenamiento local
  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  // Actualizar el estado del usuario actual en sesión
  updateCurrentUserSubject(user: User): void {
    this.currentUserSubject.next(user);
  }

  // Obtener el token JWT actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si hay una sesión activa
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Verificar al iniciar la aplicación si hay un token persistido
  private checkLocalStorageSession(): void {
    const token = this.getToken();
    if (token) {
      this.setCurrentUserFromToken(token);
    }
  }

  // Inicializar el usuario actual basado en el token simple de sesión o JWT real
  private setCurrentUserFromToken(token: string): void {
    if (token) {
      if (token.startsWith('mock-session-token-for-')) {
        const email = token.replace('mock-session-token-for-', '');
        const namePart = email.split('@')[0];
        const fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        
        this.currentUserSubject.next({
          email: email,
          fullName: fullName,
          role: { name: 'CLIENTE' }
        });
      } else {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payloadDecoded = atob(parts[1]);
            const payload = JSON.parse(payloadDecoded);
            const email = payload.sub; // subject is the email
            const namePart = email.split('@')[0];
            const fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
            
            this.currentUserSubject.next({
              email: email,
              fullName: fullName,
              role: { name: 'CLIENTE' }
            });
          } else {
            this.logout();
          }
        } catch (e) {
          this.logout();
        }
      }
    }
  }
}
