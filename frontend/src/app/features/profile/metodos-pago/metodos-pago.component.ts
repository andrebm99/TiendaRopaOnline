import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { User } from '../../../core/models/user.model';

interface Tarjeta {
  id: number;
  tipo: 'VISA' | 'MASTERCARD';
  numeroEnmascarado: string;
  nombreTitular: string;
  expiracion: string;
  predeterminado: boolean;
}

interface MonederoDigital {
  id: number;
  tipo: 'YAPE' | 'PLIN';
  telefonoEnmascarado: string;
  titular: string;
}

@Component({
  selector: 'app-metodos-pago',
  standalone: false,
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['./metodos-pago.component.scss']
})
export class MetodosPagoComponent implements OnInit {
  // Inicializados vacíos por defecto para nuevos usuarios
  tarjetas: Tarjeta[] = [];
  monederos: MonederoDigital[] = [];

  mostrarModal = false;
  tipoNuevoMetodo: 'TARJETA' | 'MONEDERO' = 'TARJETA';
  
  // Campos formulario manual
  tarjetaTipo: 'VISA' | 'MASTERCARD' = 'VISA';
  tarjetaNumero = '';
  tarjetaTitular = '';
  tarjetaExpiracion = '';

  monederoTipo: 'YAPE' | 'PLIN' = 'YAPE';
  monederoTelefono = '';
  monederoTitular = '';

  private currentUser: User | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.email) {
        this.profileService.obtenerDatosUsuario(user.email).subscribe(datos => {
          this.currentUser = datos;
          this.tarjetaTitular = datos.fullName.toUpperCase();
          this.monederoTitular = datos.fullName;
          
          if (datos.metodosPagoJson) {
            try {
              const parsed = JSON.parse(datos.metodosPagoJson);
              this.tarjetas = parsed.tarjetas || [];
              this.monederos = parsed.monederos || [];
            } catch (e) {
              this.tarjetas = [];
              this.monederos = [];
            }
          } else {
            this.tarjetas = [];
            this.monederos = [];
          }
        });
      }
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.tarjetaNumero = '';
    if (this.currentUser) {
      this.tarjetaTitular = this.currentUser.fullName.toUpperCase();
      this.monederoTitular = this.currentUser.fullName;
    } else {
      this.tarjetaTitular = '';
      this.monederoTitular = '';
    }
    this.tarjetaExpiracion = '';
    this.monederoTelefono = '';
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarMetodo(): void {
    if (this.tipoNuevoMetodo === 'TARJETA') {
      if (!this.tarjetaNumero || !this.tarjetaTitular || !this.tarjetaExpiracion) return;
      const mask = '•••• ' + this.tarjetaNumero.slice(-4);
      this.tarjetas.push({
        id: Date.now(),
        tipo: this.tarjetaTipo,
        numeroEnmascarado: mask,
        nombreTitular: this.tarjetaTitular.toUpperCase(),
        expiracion: this.tarjetaExpiracion,
        predeterminado: this.tarjetas.length === 0
      });
    } else {
      if (!this.monederoTelefono || !this.monederoTitular) return;
      const mask = this.monederoTelefono.slice(0, 4) + ' ••• ' + this.monederoTelefono.slice(-3);
      this.monederos.push({
        id: Date.now(),
        tipo: this.monederoTipo,
        telefonoEnmascarado: mask,
        titular: this.monederoTitular
      });
    }
    this.persistirMetodos();
    this.cerrarModal();
  }

  eliminarTarjeta(id: number): void {
    this.tarjetas = this.tarjetas.filter(t => t.id !== id);
    if (this.tarjetas.length > 0 && !this.tarjetas.some(t => t.predeterminado)) {
      this.tarjetas[0].predeterminado = true;
    }
    this.persistirMetodos();
  }

  eliminarMonedero(id: number): void {
    this.monederos = this.monederos.filter(m => m.id !== id);
    this.persistirMetodos();
  }

  establecerPredeterminado(id: number): void {
    this.tarjetas.forEach(t => t.predeterminado = t.id === id);
    this.persistirMetodos();
  }

  private persistirMetodos(): void {
    if (this.currentUser && this.currentUser.id) {
      const json = JSON.stringify({
        tarjetas: this.tarjetas,
        monederos: this.monederos
      });
      // Enviar actualización del perfil con los métodos de pago
      this.profileService.actualizarPerfil(this.currentUser.id, {
        ...this.currentUser,
        metodosPagoJson: json
      }).subscribe(updatedUser => {
        this.currentUser = updatedUser;
      });
    }
  }
}
