import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PagoService } from '../../../services/pago.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';


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

  metodoEntrega: string = 'bodega';
  compraExitosa: boolean = false;
  fb = inject(FormBuilder);
  pagoService = inject(PagoService);

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
    // Si selecciona entrega a domicilio, validamos también ese formulario
    if (this.metodoEntrega === 'domicilio' && this.direccionForm.invalid) {
      this.direccionForm.markAllAsTouched();
      return;
    }

    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      return;
    }

    const datosPago = {
      ...this.pagoForm.value,
      metodoEntrega: this.metodoEntrega,
      ...(this.metodoEntrega === 'domicilio' ? this.direccionForm.value : {})
    };

    console.log('🧾 Datos del pago enviados:', datosPago);

    this.compraExitosa = true;

    this.pagoForm.reset();
    this.direccionForm.reset();
    this.metodoEntrega = 'bodega';
  }
}


