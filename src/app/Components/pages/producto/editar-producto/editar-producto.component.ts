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
  // Si ya viene en base64 desde el backend
  if (data.imagen) {
    this.imagenURL = `data:image/jpeg;base64,${data.imagen}`;
  }

  this.imagenOriginal = this.imagenURL;
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
  // Si el usuario cargó una nueva imagen
  if (this.imagenURL && typeof this.imagenURL === 'string' && this.imagenURL !== this.imagenOriginal) {
    const base64 = this.imagenURL.split(',')[1];
    this.data.imagenBase64 = base64;
    this.data.imagen = base64;
  } else {
    // El usuario NO cargó una nueva imagen → conserva la actual
    const base64 = (this.imagenOriginal as string)?.split(',')[1];
    this.data.imagenBase64 = base64;
    this.data.imagen = base64;
  }

  this.dialogRef.close(this.data);
}

cancelar(): void {
  this.dialogRef.close();
}

}