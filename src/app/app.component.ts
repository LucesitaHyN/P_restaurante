import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuPageComponent } from './features/menu/menu-page.page';
import { PagoPageComponent } from './features/pagos/pago-page.page';
import { PedidoPageComponent } from './features/pedidos/pedido-page.page';
import { SeguimientoPageComponent } from './features/seguimiento/seguimiento-page.page';
import { AdminPageComponent } from './features/admin/admin-page.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuPageComponent, PagoPageComponent, PedidoPageComponent,SeguimientoPageComponent, AdminPageComponent
  ],
  template: `
    <header>
      <nav class="navbar">
        <a routerLink="/menu" routerLinkActive="activo">Menú</a>
        <a routerLink="/pedidos" routerLinkActive="activo">Pedidos</a>
        <a routerLink="/seguimiento" routerLinkActive="activo">Seguimiento</a>
        <a routerLink="/pagos" routerLinkActive="activo">Pagos</a>
        <a routerLink="/admin" routerLinkActive="activo">Admin</a>
      </nav>
    </header>

    <main class="contenido">
      <app-menu-page></app-menu-page>
      <app-pedido-page></app-pedido-page>
      <app-pago-page></app-pago-page>
      <app-seguimiento-page></app-seguimiento-page>
      <app-admin-page></app-admin-page>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: center;
      background-color: #d35400;
      padding: 1rem;
      gap: 2rem;
    }

    .navbar a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.1rem;
      padding-bottom: 0.2rem;
      border-bottom: 2px solid transparent;
      transition: border 0.3s;
    }

    .navbar a.activo,
    .navbar a:hover {
      border-bottom: 2px solid #f1c40f;
    }

    .contenido {
      padding: 2rem;
      max-width: 960px;
      margin: 0 auto;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
  `]
})
// export class AppComponent {}
export class AppComponent {
  title = 'restaurante-app'; 
}
