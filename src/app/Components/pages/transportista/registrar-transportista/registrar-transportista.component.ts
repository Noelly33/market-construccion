import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registrar-transportista',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './registrar-transportista.component.html',
  styleUrl: './registrar-transportista.component.css'
})
export class RegistrarTransportistaComponent {

  constructor(private dialogRef: MatDialogRef<RegistrarTransportistaComponent>) {}

      transportista = {
        nombre: '',
        correo: '',
        cedula: '',
        empresa: '',
        telefono: '',
        activo: true,
        rol: 'Transportista'
      };
      
  guardar() {
    this.dialogRef.close(this.transportista);
  }

  cancelar() {
    this.dialogRef.close();
  }

}


