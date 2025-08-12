import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pago-page.page.html',
  styleUrls: ['./pago-page.page.scss']
})
export class PagoPageComponent implements OnInit {
  pedido: any[] = [];
  total: number = 0;
  metodo: string = '';
  apiPedidos = 'http://localhost:3000/api/pedidos';
  apiPagos = 'http://localhost:3000/api/pagos';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.pedido = JSON.parse(localStorage.getItem('pedido') || '[]');
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.total = this.pedido.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  }

  eliminarProducto(index: number) {
    this.pedido.splice(index, 1);
    localStorage.setItem('pedido', JSON.stringify(this.pedido));
    this.actualizarTotal();
  }

  pagar() {
    if (!this.pedido.length) {
      alert('No tienes productos en el pedido');
      return;
    }


    const pedidoData = {
      productos: this.pedido.map(p => ({ id: p.id, cantidad: p.cantidad })),
      total: this.total
    };

    this.http.post<{pedidoId: number}>(this.apiPedidos, pedidoData).subscribe({
      next: (res) => {
        const pedidoId = res.pedidoId;


        this.http.post<{url: string}>(this.apiPagos, {
          pedidoId,
          productos: this.pedido
        }).subscribe({
          next: (pagoRes) => {
        
            localStorage.removeItem('pedido');
            this.pedido = [];
            this.total = 0;

       
            window.location.href = pagoRes.url;
          },
          error: (err) => {
            console.error(err);
            alert('Error al iniciar el pago con Stripe');
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar el pedido');
      }
    });
  }
}
