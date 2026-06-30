import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupStep1Component } from './signup-step1/signup-step1.component';
import { SignupConfirmComponent } from './signup-confirm/signup-confirm.component';

const routes: Routes = [
  // Ruta para el inicio de sesión
  { path: 'login', component: LoginComponent },
  // Ruta para el registro paso 1
  { path: 'signup', component: SignupStep1Component },
  // Ruta para la confirmación de cuenta
  { path: 'confirm', component: SignupConfirmComponent },
  // Redirección por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
