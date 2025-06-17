import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss']
})
export class AdminPageComponent {
  productos = [
    { nombre: 'Pizza Margarita', precio: 120 }
  ];
}
