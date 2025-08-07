import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../core/modelo/producto';
import { Observable, of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistrarProductoComponent } from '../Components/pages/producto/registrar-producto/registrar-producto.component';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
  private apiUrl = 'https://localhost:5001/api/Producto'; 

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/ObtenerTodosLosProductos`);
  }

  // Insertar nuevo producto
  insertarProducto(producto: Producto): Observable<any> {
    // Asegúrate de copiar el base64 al campo correcto
    producto.imagenBase64 = producto.imagen;

    return this.http.post<any>(`${this.apiUrl}/InsertarProducto`, producto);
  }

  actualizarProducto(producto: Producto): Observable<any> {
  if (!producto.imagenBase64 && producto.imagen) {
    producto.imagenBase64 = producto.imagen;
  }

  return this.http.put<any>(`${this.apiUrl}/ActualizarProducto`, producto);
}

  // Eliminar producto
  eliminarProducto(idProducto: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/EliminarProducto?idProducto=${idProducto}`);
  }
}
