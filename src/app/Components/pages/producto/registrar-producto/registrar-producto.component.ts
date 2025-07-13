import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../../../core/modelo/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})

export class RegistrarProductoComponent {

  producto: Producto = { id: 0, nombre: '', precio: 0, stock: 0, imagen: '', descripcion: '' };
  imagenURL: string | ArrayBuffer | null = null;


  constructor(private dialogRef: MatDialogRef<RegistrarProductoComponent>) {}
onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenURL = reader.result;
      this.producto.imagen = reader.result as string; // guardar imagen como base64
    };
    reader.readAsDataURL(file); // convierte a base64
  }
}

  guardar() {
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}