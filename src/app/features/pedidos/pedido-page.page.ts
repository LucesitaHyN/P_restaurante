import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-page.page.html',
  styleUrls: ['./pedido-page.page.scss']
})
export class PedidoPageComponent {
  pedido = [
    { nombre: 'Pizza Margarita', cantidad: 1, precio: 120 }
  ];

  get total() {
    return this.pedido.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }
}
