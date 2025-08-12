import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },


  { path: 'menu', loadComponent: () => import('./features/menu/menu-page.page').then(m => m.MenuPageComponent) },
  { path: 'pedidos', loadComponent: () => import('./features/pedidos/pedido-page.page').then(m => m.PedidoPageComponent) },
  { path: 'seguimiento', loadComponent: () => import('./features/seguimiento/seguimiento-page.page').then(m => m.SeguimientoPageComponent) },
  { path: 'pagos', loadComponent: () => import('./features/pagos/pago-page.page').then(m => m.PagoPageComponent) },


  { path: 'admin', 
    loadComponent: () => import('./features/admin/admin-page.page').then(m => m.AdminPageComponent), 
    canActivate: [AuthGuard]
  },


  { path: '**', redirectTo: 'menu' }
];
