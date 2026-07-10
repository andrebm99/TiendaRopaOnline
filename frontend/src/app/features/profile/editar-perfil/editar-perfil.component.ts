import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-editar-perfil',
  standalone: false,
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  cargando = false;
  userId = 999;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarDatosUsuario();
  }

  // Inicializar formulario reactivo con validaciones básicas
  private inicializarFormulario(): void {
    this.perfilForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[0-9+ \-]{7,15}$/)]],
      contraseniaActual: ['', [Validators.minLength(6)]],
      nuevaContasenia: ['', [Validators.minLength(6)]]
    });
  }

  // Cargar información del usuario actual en los campos correspondientes
  private cargarDatosUsuario(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.email) {
        this.profileService.obtenerDatosUsuario(user.email).subscribe(datos => {
          this.userId = datos.id || 999;
          this.perfilForm.patchValue({
            nombreCompleto: datos.fullName,
            correo: datos.email,
            telefono: datos.phoneNumber || ''
          });
        });
      } else {
        // Valores de simulación si no se ha iniciado sesión
        this.perfilForm.patchValue({
          nombreCompleto: 'ALEXA VALENCIAGA',
          correo: 'alexa@krystudio.com',
          telefono: '+34 600 000 000'
        });
      }
    });
  }

  // Enviar el formulario y simular la actualización del perfil
  guardarCambios(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      this.mensajeError = 'Por favor, rellene correctamente todos los campos obligatorios.';
      this.mensajeExito = null;
      return;
    }

    this.cargando = true;
    this.mensajeExito = null;
    this.mensajeError = null;

    const datos = {
      nombreCompleto: this.perfilForm.get('nombreCompleto')?.value,
      email: this.perfilForm.get('correo')?.value,
      telefono: this.perfilForm.get('telefono')?.value,
      nuevaContasenia: this.perfilForm.get('nuevaContasenia')?.value
    };

    this.profileService.actualizarPerfil(this.userId, datos).subscribe({
      next: (user) => {
        this.cargando = false;
        this.mensajeExito = '¡CAMBIOS GUARDADOS EXITOSAMENTE!';
        this.perfilForm.patchValue({
          contraseniaActual: '',
          nuevaContasenia: ''
        });
      },
      error: () => {
        this.cargando = false;
        this.mensajeError = 'Hubo un error al intentar guardar los cambios.';
      }
    });
  }
}
