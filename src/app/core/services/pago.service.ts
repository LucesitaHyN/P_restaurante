import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private apiUrl = 'http://localhost:3000/api/pagos';

  constructor(private http: HttpClient) {}

  procesarPago(total: number, metodo: string): Observable<any> {
    return this.http.post(this.apiUrl, { total, metodo });
  }
}