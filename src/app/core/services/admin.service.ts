import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './menu.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}
  
eliminarProducto(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/producto/${id}`);
}


  editarProducto(id: string, data: Partial<Producto>): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/producto/${id}`, data);
  }

  agregarProducto(data: Producto): Observable<Producto> {
  return this.http.post<Producto>(`http://localhost:3000/api/menu`, data);
}

}

