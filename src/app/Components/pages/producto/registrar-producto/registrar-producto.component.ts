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

  producto: Producto = { id_Producto: 0, nombreProducto: '', precioVenta: 0, stock: 0, imagen: '', imagenBase64: '', descripcion: '', estado: true };
  imagenURL: string | ArrayBuffer | null = null;


  constructor(private dialogRef: MatDialogRef<RegistrarProductoComponent>) {}
onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenURL = reader.result;

      const base64 = (reader.result as string).split(',')[1]; 
      this.producto.imagenBase64 = base64; 
      this.producto.imagen = base64;
    };
    reader.readAsDataURL(file); 
  }
}

  guardar() {
    console.log("Imagen base64 enviada:", this.producto.imagenBase64); // DEBUG
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}