import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <header class="navbar-container">
  <nav class="navbar">
    <a routerLink="/menu" routerLinkActive="activo"><i data-lucide="utensils"></i> Menú</a>
    <a routerLink="/pagos" routerLinkActive="activo" *ngIf="isLoggedIn"><i data-lucide="credit-card"></i> Pagos</a>
    <a routerLink="/pedidos" routerLinkActive="activo" *ngIf="isLoggedIn"><i data-lucide="clipboard-list"></i> Pedidos</a>
    <a routerLink="/seguimiento" routerLinkActive="activo" *ngIf="isLoggedIn"><i data-lucide="truck"></i> Seguimiento</a>
    <a routerLink="/admin" routerLinkActive="activo" *ngIf="isAdmin"><i data-lucide="settings"></i> Admin</a>

    <span class="spacer"></span>

    <ng-container *ngIf="!isLoggedIn">
      <a routerLink="/login" routerLinkActive="activo"><i data-lucide="log-in"></i> Login</a>
      <a routerLink="/register" routerLinkActive="activo"><i data-lucide="user-plus"></i> Registro</a>
    </ng-container>
    <a href="#" (click)="logout()" *ngIf="isLoggedIn"><i data-lucide="log-out"></i> Salir</a>
  </nav>
</header>

<main class="contenido">
  <router-outlet></router-outlet>
</main>

  `,
  styles: [`
    .navbar-container {
  background: linear-gradient(90deg, var(--color-primario), var(--color-secundario));
  padding: 1rem 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease;
}

.navbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.6rem;
    border-radius: 8px;
    transition: background 0.3s, transform 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    &.activo {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  i {
    width: 18px;
    height: 18px;
  }

  .spacer {
    flex-grow: 1;
  }
}

.contenido {
  padding: 2rem;
  max-width: 960px;
  margin: auto;
  animation: fadeInUp 0.5s ease;
}

  `]
})
export class AppComponent {
  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol === 'admin';
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
