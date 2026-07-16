import { Routes } from '@angular/router';
import {AdminProductoComponent} from './admin-producto/admin-producto.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // Módulo de autenticación (Carga perezosa de módulo clásico)
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  // Página de inicio (Home)
  {
    path: '',
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (m) => m.HomeComponent,
      ),
  },
  // Página Dónde/Cómo Comprar
  {
    path: 'como-comprar',
    loadComponent: () =>
      import('./features/pages/como-comprar/como-comprar.component').then(
        (m) => m.ComoComprarComponent,
      ),
  },
  // Página de información de Envíos
  {
    path: 'envios',
    loadComponent: () =>
      import('./features/pages/envios/envios.component').then(
        (m) => m.EnviosComponent,
      ),
  },
  // Catálogo completo de prendas de la tienda
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./features/pages/catalogo/catalogo.component').then(
        (m) => m.CatalogoComponent,
      ),
  },
  // Bolsa de compras del cliente
  {
    path: 'bolsa',
    loadComponent: () =>
      import('./features/pages/bolsa/bolsa.component').then(
        (m) => m.BolsaComponent,
      ),
  },
  // Perfil / Mi Cuenta del cliente
  {
    path: 'perfil',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
  },
  // Páginas Legales (Cumplimiento Perú)
  {
    path: 'politica-privacidad',
    loadComponent: () =>
      import('./features/pages/legal/politica-privacidad/politica-privacidad.component').then(
        (m) => m.PoliticaPrivacidadComponent,
      ),
  },
  {
    path: 'terminos-condiciones',
    loadComponent: () =>
      import('./features/pages/legal/terminos-condiciones/terminos-condiciones.component').then(
        (m) => m.TerminosCondicionesComponent,
      ),
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./features/pages/admin/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent,
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/productos',
    component: AdminProductoComponent,
    canActivate: [adminGuard]
  },
  // Redirección por defecto
  {
    path: '**',
    redirectTo: '',
  },
];
