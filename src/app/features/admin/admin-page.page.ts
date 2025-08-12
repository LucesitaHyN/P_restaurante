import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss']
})
export class AdminPageComponent implements OnInit {
  productos: any[] = [];
  pedidos: any[] = [];

  constructor(private adminService: AdminService, private http: HttpClient) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarPedidos(); 
  }

  cargarProductos() {
    fetch('http://localhost:3000/api/menu')
      .then(res => res.json())
      .then(data => this.productos = data);
  }

  cargarPedidos() {
    this.http.get<any[]>('http://localhost:3000/api/pedidos').subscribe({
      next: (data) => this.pedidos = data,
      error: () => alert('Error al cargar los pedidos')
    });
  }

  eliminarProducto(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.adminService.eliminarProducto(id).subscribe(() => {
        this.productos = this.productos.filter(p => p.id !== id);
      });
    }
  }

  editarProducto(producto: any) {
    const nombre = prompt('Nuevo nombre', producto.nombre) || producto.nombre;
    const categoria = prompt('Nueva categoría', producto.categoria) || producto.categoria;
    const precio = +(prompt('Nuevo precio', producto.precio) || producto.precio);
    this.adminService.editarProducto(producto.id, { nombre, categoria, precio }).subscribe(() => {
      producto.nombre = nombre;
      producto.categoria = categoria;
      producto.precio = precio;
    });
  }

  agregarProducto() {
    const nombre = prompt('Nombre del producto');
    const categoria = prompt('Categoría');
    const precio = +(prompt('Precio') || 0);

    if (nombre && categoria && precio) {
      this.adminService.agregarProducto({ nombre, categoria, precio }).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  cambiarEstado(pedido: any) {
    const nuevoEstado = prompt('Nuevo estado (pendiente o entregado):', pedido.estado);
    if (nuevoEstado && (nuevoEstado === 'pendiente' || nuevoEstado === 'entregado')) {
      this.http.put(`http://localhost:3000/api/admin/pedido/${pedido.id}`, { estado: nuevoEstado }).subscribe(() => {
        alert('Estado actualizado');
        this.cargarPedidos();
      });
    } else {
      alert('Estado inválido');
    }
  }
}
