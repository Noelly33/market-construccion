import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})

export class EditarUsuarioComponent {
  
  constructor(
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  guardar() {
    this.data.activo = !!this.data.activo;
    this.dialogRef.close(this.data);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
