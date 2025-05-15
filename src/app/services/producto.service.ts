import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../core/modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
  private http =  inject(HttpClient);
  private url: string = 'json/productos.json';
  
  getProductos() {
    return this.http.get<Producto[]>(this.url);
  }
}
