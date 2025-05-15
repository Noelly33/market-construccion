import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { Carrito } from '../../../core/modelo/carrito';

@Component({
  selector: 'app-carrito-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-listar.component.html',
  styleUrls: ['./carrito-listar.component.css']
})
export class CarritoListarComponent implements OnInit {

  private carritoService = inject(CarritoService);

  listCarrito: Carrito[] = [];

  ngOnInit(): void {
    this.getListCarrito();
  }

  getListCarrito() {
    this.listCarrito = this.carritoService.getCarrito();
  }

  eliminarItem(index: number): void {
     this.carritoService.eliminar(index); 
     this.getListCarrito();     
  }

  calcularTotal(): number {
    return this.listCarrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }
}

