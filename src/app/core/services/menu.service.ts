import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  _id?: string;
  nombre: string;
  categoria: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private apiUrl = 'http://localhost:3000/api/menu';

  constructor(private http: HttpClient) {}

  obtenerMenu(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
}
