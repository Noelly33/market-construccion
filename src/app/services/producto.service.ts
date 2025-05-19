import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../core/modelo/producto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
  private productos: Producto[] = JSON.parse(localStorage.getItem('productos') || '[]');

  getProductos(): Observable<Producto[]> {
    return of(this.productos);
  }

  agregarProducto(p: Producto) {
    p.id = this.generarId();
    this.productos.push(p);
    this.guardar();
  }

  actualizarProducto(p: Producto) {
    const index = this.productos.findIndex(x => x.id === p.id);
    if (index > -1) {
      this.productos[index] = p;
      this.guardar();
    }
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.guardar();
  }

  private guardar() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  private generarId(): number {
    return this.productos.length ? Math.max(...this.productos.map(p => p.id)) + 1 : 1;
  }

}
