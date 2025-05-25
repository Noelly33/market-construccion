import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../../../core/modelo/producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})

export class EditarProductoComponent {
  imagenURL: string | ArrayBuffer | null = null; 
  imagenOriginal: string | ArrayBuffer | null = null; 

  imagenesDisponibles: string[] = [
    'bloques.jpg',
    'cemento.jpg',
    'estribos.png'
  ];

  constructor(
    private dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto 
  ) {

    this.imagenURL = data.imagen; 
    this.imagenOriginal = data.imagen;

  }

  getImagenURL(nombreImagen: string): string {
  return `/assets/img/${nombreImagen}`;
}
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenURL = reader.result;
        this.data.imagen = reader.result as string; 
      };
      reader.readAsDataURL(file);
    }
  }

  guardar() {
    this.dialogRef.close(this.data); 
  }

  cancelar() {
    this.dialogRef.close();
  }
}