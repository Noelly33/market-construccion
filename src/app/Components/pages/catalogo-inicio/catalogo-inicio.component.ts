import { Component, inject, OnInit } from '@angular/core';
import { ProductoService} from '../../../services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { CarritoService } from '../../../services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo-inicio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './catalogo-inicio.component.html',
  styleUrl: './catalogo-inicio.component.css'
})

  export class CatalogoInicioComponent implements OnInit {


    private productoService = inject(ProductoService);  
    private carritoService = inject(CarritoService);
    productos: Producto[] = [];

    productoSeleccionado?: Producto;

   
    ngOnInit(): void {
      this.getProductos();
        
    }
    getProductos() {
      this.productoService.getProductos().subscribe({
        next: (data) => {
          this.productos = data;
          console.error(this.productos);
        }, error: (e) => {
          console.error(e);
        }
      })
    }

    getImagenURL(nombre: string): string {
      const base64 = localStorage.getItem('img_' + nombre);
      return base64 ? base64 : 'img/' + nombre; // fallback si no está en localStorage
    }

    agregarProducto(item: Producto) {
      const cantidad = item.cantidad && item.cantidad > 0 ? item.cantidad : 1;
      this.carritoService.agregar(item, cantidad);
    }

     mostrarDescripcion(producto: Producto) {
      this.productoSeleccionado = producto;
    }
}

