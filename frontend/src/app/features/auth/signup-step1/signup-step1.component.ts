import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step1',
  standalone: false,
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.scss']
})
export class SignupStep1Component {
  readonly signupForm: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    // === FORMULARIO REACTIVO DE REGISTRO ===
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Ocultar y mostrar contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
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
