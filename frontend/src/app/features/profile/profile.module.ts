import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';

import { AccountLayoutComponent } from './layout/account-layout.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';

@NgModule({
  declarations: [
    AccountLayoutComponent,
    EditarPerfilComponent,
    MetodosPagoComponent,
    DireccionesComponent,
    PedidosComponent,
    ListaDeseosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
