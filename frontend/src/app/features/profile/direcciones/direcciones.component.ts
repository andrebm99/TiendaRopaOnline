import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { User } from '../../../core/models/user.model';

interface Direccion {
  id: number;
  tipo: 'ENVIO' | 'FACTURACION';
  destinatario: string;
  calle: string;
  ubigeo: string; // Codigo postal / Distrito
  ciudadPais: string;
  telefono: string;
  predeterminada: boolean;
}

@Component({
  selector: 'app-direcciones',
  standalone: false,
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit {
  // Inicializada vacía por defecto para nuevos usuarios
  direcciones: Direccion[] = [];

  mostrarModal = false;
  modoEdicion = false;
  idDireccionEdicion: number | null = null;

  // Campos de formulario
  tipo: 'ENVIO' | 'FACTURACION' = 'ENVIO';
  destinatario = '';
  calle = '';
  ubigeo = '';
  ciudadPais = '';
  telefono = '';

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
          this.destinatario = datos.fullName.toUpperCase();
          this.telefono = datos.phoneNumber || '';
          
          if (datos.direccionesJson) {
            try {
              this.direcciones = JSON.parse(datos.direccionesJson);
            } catch (e) {
              this.direcciones = [];
            }
          } else {
            this.direcciones = [];
          }
        });
      }
    });
  }

  abrirModalNuevo(): void {
    this.modoEdicion = false;
    this.idDireccionEdicion = null;
    this.tipo = 'ENVIO';
    if (this.currentUser) {
      this.destinatario = this.currentUser.fullName.toUpperCase();
      this.telefono = this.currentUser.phoneNumber || '';
    } else {
      this.destinatario = '';
      this.telefono = '';
    }
    this.calle = '';
    this.ubigeo = '';
    this.ciudadPais = 'Lima, Perú';
    this.mostrarModal = true;
  }

  abrirModalEditar(d: Direccion): void {
    this.modoEdicion = true;
    this.idDireccionEdicion = d.id;
    this.tipo = d.tipo;
    this.destinatario = d.destinatario;
    this.calle = d.calle;
    this.ubigeo = d.ubigeo;
    this.ciudadPais = d.ciudadPais;
    this.telefono = d.telefono;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarDireccion(): void {
    if (!this.destinatario || !this.calle || !this.ubigeo || !this.ciudadPais) return;

    if (this.modoEdicion && this.idDireccionEdicion !== null) {
      // Editar
      const idx = this.direcciones.findIndex(d => d.id === this.idDireccionEdicion);
      if (idx !== -1) {
        this.direcciones[idx] = {
          ...this.direcciones[idx],
          tipo: this.tipo,
          destinatario: this.destinatario.toUpperCase(),
          calle: this.calle,
          ubigeo: this.ubigeo,
          ciudadPais: this.ciudadPais,
          telefono: this.telefono
        };
      }
    } else {
      // Crear
      this.direcciones.push({
        id: Date.now(),
        tipo: this.tipo,
        destinatario: this.destinatario.toUpperCase(),
        calle: this.calle,
        ubigeo: this.ubigeo,
        ciudadPais: this.ciudadPais,
        telefono: this.telefono,
        predeterminada: this.direcciones.length === 0
      });
    }
    this.persistirDirecciones();
    this.cerrarModal();
  }

  eliminarDireccion(id: number): void {
    this.direcciones = this.direcciones.filter(d => d.id !== id);
    if (this.direcciones.length > 0 && !this.direcciones.some(d => d.predeterminada)) {
      this.direcciones[0].predeterminada = true;
    }
    this.persistirDirecciones();
  }

  establecerPredeterminada(id: number): void {
    this.direcciones.forEach(d => d.predeterminada = d.id === id);
    this.persistirDirecciones();
  }

  private persistirDirecciones(): void {
    if (this.currentUser && this.currentUser.id) {
      const json = JSON.stringify(this.direcciones);
      // Enviar actualización del perfil con la nueva lista de direcciones
      this.profileService.actualizarPerfil(this.currentUser.id, {
        ...this.currentUser,
        direccionesJson: json
      }).subscribe(updatedUser => {
        this.currentUser = updatedUser;
      });
    }
  }
}
