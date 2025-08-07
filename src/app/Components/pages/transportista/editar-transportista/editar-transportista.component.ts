import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transportista } from '../../../../core/modelo/transportista';
import { TransportistaService } from '../../../../services/transportista.service';

@Component({
  selector: 'app-editar-transportista',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-transportista.component.html',
  styleUrl: './editar-transportista.component.css'
})

export class EditarTransportistaComponent {
  
  constructor(
    private dialogRef: MatDialogRef<EditarTransportistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transportista,
    private transportistaService: TransportistaService
  ) {}

  guardar() {
     this.data.transaccion = 'ACTUALIZAR_TRANSPORTISTA';
  this.dialogRef.close(this.data);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
