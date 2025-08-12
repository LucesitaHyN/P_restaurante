import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedido-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-page.page.html',
  styleUrls: ['./pedido-page.page.scss']
})
export class PedidoPageComponent implements OnInit {
  pedidos: any[] = [];
  apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.pedidos = data,
      error: () => alert('Error al cargar los pedidos')
    });
  }
}
