import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seguimiento-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './seguimiento-page.page.html',
  styleUrls: ['./seguimiento-page.page.scss']
})
export class SeguimientoPageComponent {
  estadoPedido = 'En preparación'; // Cambiar según API
}
