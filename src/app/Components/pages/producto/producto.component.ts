
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
   productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;

  constructor(private dialog: MatDialog, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => this.productos = data);
  }

  abrirRegistro(): void {
    const dialogRef = this.dialog.open(RegistrarProductoComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((nuevo: Producto) => {
      if (nuevo) {
        this.productoService.agregarProducto(nuevo);
        this.ngOnInit(); // recarga lista
      }
    });
  }

  editar(producto: Producto): void {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '400px',
      data: { ...producto }
    });
    dialogRef.afterClosed().subscribe((actualizado: Producto) => {
      if (actualizado) {
        this.productoService.actualizarProducto(actualizado);
        this.ngOnInit();
      }
    });
  }

  eliminar(id: number): void {
    this.productoService.eliminarProducto(id);
    this.ngOnInit();
  }
  getImagenURL(nombreImagen?: string): string {
  if (!nombreImagen) return '';
  return localStorage.getItem('img_' + nombreImagen) || '';
}

}
