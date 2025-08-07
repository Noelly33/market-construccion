import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../core/modelo/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private baseUrl = 'https://localhost:5001'; // Cambia por tu URL real

  constructor(private http: HttpClient) { }

  insertarCompra(compra: Compra): Observable<any> {
    return this.http.post(`${this.baseUrl}/InsertarCompra`, compra);
  }
}
