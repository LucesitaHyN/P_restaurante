import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-page.page.html',
  styleUrls: ['./menu-page.page.scss']
})
export class MenuPageComponent implements OnInit {
  categorias = ['Entradas', 'Platos Fuertes', 'Postres', 'Bebidas', 'Desayunos'];
  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.http.get<any[]>('http://localhost:3000/api/menu').subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: () => {
        alert('Error al cargar los productos');
      }
    });
  }

  agregarAlPedido(producto: any) {
    let pedido: any[] = JSON.parse(localStorage.getItem('pedido') || '[]');
    const idx = pedido.findIndex(p => p.id === producto.id);
    if (idx >= 0) {
      pedido[idx].cantidad += 1;
    } else {
      pedido.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('pedido', JSON.stringify(pedido));
    alert(`${producto.nombre} agregado al pedido`);
  }
}
