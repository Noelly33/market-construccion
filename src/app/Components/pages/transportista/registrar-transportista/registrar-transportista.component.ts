import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transportista } from '../../../../core/modelo/transportista';
import { TransportistaService } from '../../../../services/transportista.service';


@Component({
  selector: 'app-registrar-transportista',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './registrar-transportista.component.html',
  styleUrl: './registrar-transportista.component.css'
})

export class RegistrarTransportistaComponent {

  transportista: Transportista = {
    id_Transportista: 0,
    nombre_Completo: '',
    correo_Electronico: '',
    cedula: '',
    empresa: '',
    telefono: '',
    estado: true,
   transaccion: 'INSERTAR_TRANSPORTISTA'
  };

  constructor(
    private dialogRef: MatDialogRef<RegistrarTransportistaComponent>,
    private transportistaService: TransportistaService
  ) {}

  guardar() {
    /*this.transportistaService.insertarTransportista(this.transportista).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => {
        console.error('Error al registrar transportista:', err);
        alert('Error al registrar transportista.');
      }*/
     this.transportista.transaccion = 'INSERTAR_TRANSPORTISTA';

  console.log("JSON que se envía:", this.transportista);

  this.transportistaService.insertarTransportista(this.transportista).subscribe({
    next: () => {
      alert('Transportista registrado con éxito.');
      this.dialogRef.close(true);
    },
    error: err => {
      console.error('Error al registrar transportista:', err);
      alert('Error al registrar transportista.');
    }
      
    });
    console.log(this.transportista);
  }

  cancelar() {
    this.dialogRef.close();
  }

}


