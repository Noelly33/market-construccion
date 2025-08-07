import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carrito, Carrito as CarritoModel} from '../../../core/modelo/carrito';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransportistaService } from '../../../services/transportista.service';
import { Transportista } from '../../../core/modelo/transportista';
import { Producto } from '../../../core/modelo/producto';
import { CompraService } from '../../../services/compra.service';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { DetalleCompra } from '../../../core/modelo/detalleCompra';
import { Compra } from '../../../core/modelo/compra';
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from '@angular/material/form-field';




  @Component({
    selector: 'app-carrito-listar',
    standalone: true,
    imports: [CommonModule, MatDialogModule, FormsModule, MatCard, MatIcon],
    templateUrl: './carrito-listar.component.html',
    styleUrls: ['./carrito-listar.component.css']
  })
export class CarritoListarComponent implements OnInit {

  listCarrito: Carrito[] = [];
  metodoEntrega: string = 'bodega';
  direccion: string = '';
  transportistaSeleccionado: Transportista | null = null;
  listaTransportistas: Transportista[] = [];
  compraExitosa: boolean = false;
 

  // Modelo de pago enlazado con ngModel
  pago = {
    nombre_Titular: '',
    numero_Tarjeta: '',
    fecha_Expiracion: '',
    cvv: ''
  };

  constructor(
    private carritoService: CompraService,
    private transportistaService: TransportistaService
  ) {}

  ngOnInit(): void {
    this.getListCarrito();
    this.cargarTransportistas();
  }

  getListCarrito(): void {
    const carrito = localStorage.getItem('carrito');
    this.listCarrito = carrito ? JSON.parse(carrito) : [];
  }

  eliminarItem(index: number): void {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  carrito.splice(index, 1); // elimina el elemento por índice
  localStorage.setItem('carrito', JSON.stringify(carrito)); // actualiza el localStorage
  this.getListCarrito(); // <-- CORRECTO: debe ejecutarse
}


  cargarTransportistas(): void {
    this.transportistaService.obtenerTodos().subscribe(data => {
      this.listaTransportistas = data;
    });
  }

  calcularTotal(): number {
    return this.listCarrito.reduce((total, item) => total + (item.producto.precioVenta * item.cantidad), 0);
  }

  getSrcImagen(base64?: string): string {
    if (!base64) return 'assets/img/no-image.png';
    return base64.startsWith('data:image') ? base64 : 'data:image/png;base64,' + base64;
  }

  enviarPago(): void {
    // Validaciones mínimas
    if (this.metodoEntrega === 'domicilio') {
      if (!this.direccion.trim() || !this.transportistaSeleccionado) {
        alert('Debe ingresar la dirección y seleccionar un transportista.');
        return;
      }
    }

    if (
      !this.pago.nombre_Titular.trim() ||
      !this.pago.numero_Tarjeta.trim() ||
      !this.pago.fecha_Expiracion.trim() ||
      !this.pago.cvv.trim()
    ) {
      alert('Por favor complete todos los campos de pago.');
      return;
    }

    if (!/^\d{16}$/.test(this.pago.numero_Tarjeta)) {
      alert('El número de tarjeta debe tener 16 dígitos.');
      return;
    }

    if (!/^\d{3}$/.test(this.pago.cvv)) {
      alert('El CVV debe tener 3 dígitos.');
      return;
    }

    // Armar detalles
    const detalles: DetalleCompra[] = this.listCarrito.map(item => ({
      id_Producto: item.producto.id_Producto!,
      precio_Compra: item.producto.precioVenta,
      cantidad: item.cantidad,
      subtotal: item.producto.precioVenta * item.cantidad
    }));

    const compra: Compra = {
      total: this.calcularTotal(),
      metodo_Entrega: this.metodoEntrega,
      id_Transportista: this.metodoEntrega === 'domicilio' ? this.transportistaSeleccionado?.id_Transportista || 0 : 0,
      detalles: detalles,
      pago: this.pago,
      transaccion: 'INSERTAR_COMPRA'
    };

    this.carritoService.insertarCompra(compra).subscribe({
      next: (resp) => {
        console.log('✅ Compra registrada con éxito', resp);
        this.compraExitosa = true;
        this.pago = {
          nombre_Titular: '',
          numero_Tarjeta: '',
          fecha_Expiracion: '',
          cvv: ''
        };
        this.direccion = '';
        this.transportistaSeleccionado = null;
        localStorage.removeItem('carrito');
        this.listCarrito = [];
      },
      error: (err) => {
        console.error('❌ Error al registrar compra:', err);
      }
    });
  
  
/*export interface Carrito {
  producto: Producto;
  cantidad: number;
}*/
}
}
