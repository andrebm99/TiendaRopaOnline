import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupStep1Component } from './signup-step1/signup-step1.component';
import { SignupConfirmComponent } from './signup-confirm/signup-confirm.component';

@NgModule({
  declarations: [
    // Declaración de los componentes de autenticación
    LoginComponent,
    SignupStep1Component,
    SignupConfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
