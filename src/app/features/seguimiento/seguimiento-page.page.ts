import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seguimiento-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seguimiento-page.page.html',
  styleUrls: ['./seguimiento-page.page.scss']
})
export class SeguimientoPageComponent implements OnInit {
  estadoPedido = 'No hay pedidos';
  apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerUltimoPedido();
  }

  obtenerUltimoPedido() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (pedidos) => {
        if (pedidos.length > 0) {
          const ultimo = pedidos[pedidos.length - 1];
          this.estadoPedido = ultimo.estado;
        }
      },
      error: () => {
        this.estadoPedido = 'Error al obtener pedido';
      }
    });
  }
}
