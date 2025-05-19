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
  producto: Producto = { id: 0, nombre: '', precio: 0, imagen: '', descripcion: '' };
  imagenURL: string | ArrayBuffer | null = null;


  constructor(private dialogRef: MatDialogRef<RegistrarProductoComponent>) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenURL = reader.result;
        this.producto.imagen = file.name;
        this.guardarImagenEnLocal(file);
      };
      reader.readAsDataURL(file);
    }
  }

  guardarImagenEnLocal(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('img_' + file.name, reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  guardar() {
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}