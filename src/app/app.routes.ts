import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },  
  { path: 'menu', loadComponent: () => import('./features/menu/menu-page.page').then(m => m.MenuPageComponent) },
  { path: 'pedidos', loadComponent: () => import('./features/pedidos/pedido-page.page').then(m => m.PedidoPageComponent) },
  { path: 'seguimiento', loadComponent: () => import('./features/seguimiento/seguimiento-page.page').then(m => m.SeguimientoPageComponent) },
  { path: 'pagos', loadComponent: () => import('./features/pagos/pago-page.page').then(m => m.PagoPageComponent) },
  { path: 'admin', loadComponent: () => import('./features/admin/admin-page.page').then(m => m.AdminPageComponent) },
  { path: '**', redirectTo: 'menu' }
];
