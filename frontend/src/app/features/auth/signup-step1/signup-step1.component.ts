import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

// === VALIDACIÓN DE CONTRASENIAS COINCIDENTES ===
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repetirContrasena = control.get('repetirContrasena');
  return password && repetirContrasena && password.value === repetirContrasena.value ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-signup-step1',
  standalone: false,
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.scss']
})
export class SignupStep1Component {
  readonly signupForm: FormGroup;
  showPassword = false;
  showRepetirPassword = false;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    // === FORMULARIO REACTIVO DE REGISTRO ===
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  // Ocultar y mostrar contraseñas
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRepetirPasswordVisibility(): void {
    this.showRepetirPassword = !this.showRepetirPassword;
  }

  // === PROCESAR ENVÍO DEL FORMULARIO ===
  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    // Simular proceso de registro local y avanzar al paso de confirmación
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/auth/confirm']);
    }, 1000);
  }
}
