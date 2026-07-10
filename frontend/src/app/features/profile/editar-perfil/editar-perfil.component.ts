import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
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
      if (user) {
        this.perfilForm.patchValue({
          nombreCompleto: user.fullName,
          correo: user.email,
          telefono: user.phoneNumber || ''
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

    // Simulación de guardado con timeout
    setTimeout(() => {
      this.cargando = false;
      this.mensajeExito = '¡CAMBIOS GUARDADOS EXITOSAMENTE!';
      
      // Limpiar campos de contraseña por seguridad
      this.perfilForm.patchValue({
        contraseniaActual: '',
        nuevaContasenia: ''
      });
    }, 1000);
  }
}
