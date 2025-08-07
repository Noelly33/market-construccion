
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {

  filtro: string = '';
  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;

  constructor(private dialog: MatDialog, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => this.productos = data);
    console.log(this.productos);
  }

    get datosFiltrados() {
    return this.productos.filter(t =>
      t.nombreProducto.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  abrirRegistro(): void {
  const dialogRef = this.dialog.open(RegistrarProductoComponent, { width: '400px' });

  dialogRef.afterClosed().subscribe((nuevo: Producto) => {
    if (nuevo) {
      this.productoService.insertarProducto(nuevo).subscribe({
        next: () => {
          this.ngOnInit(); // Recarga tabla
          console.log('Producto registrado:', nuevo);
        },
        error: err => {
          console.error('Error al registrar producto:', err);
          alert('Error al registrar producto.');
        }
      });
    }
  });
}
editar(producto: Producto): void {
  const productoClonado: Producto = { ...producto };

  if (producto.imagen && !producto.imagenBase64) {
    productoClonado.imagenBase64 = producto.imagen;
    productoClonado.imagen = producto.imagen; // es base64
  }

  const dialogRef = this.dialog.open(EditarProductoComponent, {
    width: '400px',
    data: productoClonado
  });

  dialogRef.afterClosed().subscribe((actualizado: Producto) => {
    if (actualizado) {
      this.productoService.actualizarProducto(actualizado).subscribe({
        next: () => this.ngOnInit(),
        error: err => {
          console.error('Error al actualizar producto:', err);
          alert('Error al actualizar producto.');
        }
      });
    }
  });
}

  eliminar(producto: Producto): void {
  this.productoService.eliminarProducto(producto.id_Producto ?? 0).subscribe({
    next: () => this.ngOnInit(),
    error: err => {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar producto.');
    }
  });
}
getImagenSrc(base64: string | null): string {
    if (!base64) return '';
    return `data:image/jpeg;base64,${base64}`;
  }

}
