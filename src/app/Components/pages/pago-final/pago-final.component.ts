/*import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { Transportista } from '../../../core/modelo/transportista';
import { CompraService } from '../../../services/compra.service';
import { Compra } from '../../../core/modelo/compra';
import { DetalleCompra } from '../../../core/modelo/detalleCompra';


@Component({
  selector: 'app-pago-final',
  standalone: true,
  imports: [
     CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule, MatIconModule, MatCard
  ],
  templateUrl: './pago-final.component.html',
  styleUrls: ['./pago-final.component.css']
})

export class PagoFinalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  metodoEntrega: string;
  direccion: string;
  transportista: Transportista;
  //carrito: Carrito[];
  total: number;
}) {}

  metodoEntrega: string = 'bodega';
  compraExitosa: boolean = false;
  fb = inject(FormBuilder);
  compraService = inject(CompraService);

  transportistas: string[] = ['DHL', 'FedEx', 'Servientrega'];

  pagoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    fechaExpiracion: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
  });

   direccionForm: FormGroup = this.fb.group({
    direccion: ['', Validators.required],
    transportista: ['', Validators.required]
  });

  mostrarFormularioDomicilio(): boolean { // <--- Agrega este método
    return this.metodoEntrega === 'domicilio';
  }

  enviarPago() {
  if (this.data.metodoEntrega === 'domicilio' && this.direccionForm.invalid) {
    this.direccionForm.markAllAsTouched();
    return;
  }

  if (this.pagoForm.invalid) {
    this.pagoForm.markAllAsTouched();
    return;
  }

  // Detalles de productos
  const detalles: DetalleCompra[] = this.data.carrito.map(item => ({
  id_Producto: item.producto.id_Producto!, // <- aseguramos que no sea undefined
  precio_Compra: item.producto.precioVenta,
  cantidad: item.cantidad,
  subtotal: item.producto.precioVenta * item.cantidad
}));


  // Datos del pago
  const pago = {
    nombre_Titular: this.pagoForm.value.nombre,
    numero_Tarjeta: this.pagoForm.value.numero_Tarjeta.toString(),
    fecha_Expiracion: this.pagoForm.value.fecha_Expiracion,
    cvv: this.pagoForm.value.cvv
  };

  // Objeto Compra (completo)
  const compra: Compra = {
    total: this.data.total,
    metodo_Entrega: this.data.metodoEntrega,
    id_Transportista: this.data.metodoEntrega === 'domicilio' ? this.data.transportista.id_Transportista : 0,
    detalles: detalles,
    pago: pago,
    transaccion: 'INSERTAR_COMPRA'
  };
  console.log('🧾 Datos de pago:', pago);
  console.log('🧾 Compra lista para enviar a la API:', compra);
  console.log('🛒 Detalles de la compra:', detalles);
  // Llamada al backend
  this.compraService.insertarCompra(compra).subscribe({
    next: (resp) => {
      console.log('Respuesta API:', resp);
      this.compraExitosa = true;
    },
    error: (err) => {
      console.error(' Error al registrar compra:', err);
    }
  });

  this.pagoForm.reset();
  this.direccionForm.reset();
}
}*/


