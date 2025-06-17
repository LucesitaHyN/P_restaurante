import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, RouterModule
  ],
  templateUrl: './menu-page.page.html',
  styleUrls: ['./menu-page.page.scss']
})
export class MenuPageComponent {
  categorias = ['Entradas', 'Platos Fuertes', 'Postres', 'Bebidas'];
  productos = [
    { nombre: 'Pizza Margarita', precio: 120, categoria: 'Platos Fuertes' },
    { nombre: 'Agua de Horchata', precio: 25, categoria: 'Bebidas' }
  ];
}
