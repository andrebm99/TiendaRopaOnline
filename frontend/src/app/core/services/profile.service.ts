import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // Caché en memoria para evitar llamadas redundantes o pérdidas temporales de sesión
  private usuarioEnMemoria: User | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService
  ) {}

  // Obtener la información completa del usuario actual desde el backend
  obtenerDatosUsuario(email: string): Observable<User> {
    if (this.usuarioEnMemoria && this.usuarioEnMemoria.email.toLowerCase() === email.toLowerCase()) {
      return of(this.usuarioEnMemoria);
    }

    return this.apiService.get<User>(`user/email/${email}`).pipe(
      map(usuarioEncontrado => {
        this.usuarioEnMemoria = usuarioEncontrado;
        return usuarioEncontrado;
      }),
      catchError(() => {
        // Retornar objeto base de simulación en memoria (sin persistir en localStorage)
        const namePart = email.split('@')[0];
        const fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const fallbackUser: User = {
          id: 999,
          fullName: fullName,
          email: email,
          phoneNumber: '+34 600 000 000'
        };
        this.usuarioEnMemoria = fallbackUser;
        return of(fallbackUser);
      })
    );
  }

  // Actualizar los datos del perfil
  actualizarPerfil(id: number, datosActualizados: any): Observable<User> {
    const email = datosActualizados.email || datosActualizados.correo;
    
    const userPayload: any = {
      fullName: datosActualizados.nombreCompleto || datosActualizados.fullName,
      email: email,
      phoneNumber: datosActualizados.telefono || datosActualizados.phoneNumber
    };

    if (datosActualizados.nuevaContasenia) {
      userPayload.password = datosActualizados.nuevaContasenia;
    }

    if (id && id !== 999) {
      return this.apiService.put<User>(`user/${id}`, userPayload).pipe(
        tap(user => {
          this.usuarioEnMemoria = user;
          this.authService.updateCurrentUserSubject(user);
        }),
        catchError(error => {
          console.warn('Fallo en el guardado del backend. Aplicando cambio temporal en memoria.');
          const fallbackUser: User = {
            id: id,
            fullName: userPayload.fullName,
            email: userPayload.email,
            phoneNumber: userPayload.phoneNumber
          };
          this.usuarioEnMemoria = fallbackUser;
          this.authService.updateCurrentUserSubject(fallbackUser);
          return of(fallbackUser);
        })
      );
    } else {
      const fallbackUser: User = {
        id: 999,
        fullName: userPayload.fullName,
        email: userPayload.email,
        phoneNumber: userPayload.phoneNumber
      };
      this.usuarioEnMemoria = fallbackUser;
      this.authService.updateCurrentUserSubject(fallbackUser);
      return of(fallbackUser);
    }
  }
}
