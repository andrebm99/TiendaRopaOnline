import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountLayoutComponent } from './layout/account-layout.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';

const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      { path: 'editar', component: EditarPerfilComponent },
      { path: 'metodos-pago', component: MetodosPagoComponent },
      { path: 'direcciones', component: DireccionesComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'lista-deseos', component: ListaDeseosComponent },
      { path: '', redirectTo: 'editar', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
