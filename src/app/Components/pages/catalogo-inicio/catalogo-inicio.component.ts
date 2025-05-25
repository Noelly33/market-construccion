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
      this.productos = data.map(producto => ({ ...producto, cantidad: 1 }));
    },
    error: (e) => {
      console.error(e);
    }
  });
}


    getSrcImagen(base64?: string): string {
      if (!base64) return 'assets/img/no-image.png'; // Imagen por defecto si no hay imagen
      return base64.startsWith('data:image') ? base64 : 'data:image/png;base64,' + base64;
    }

    agregarProducto(item: Producto) {
      const cantidad = item.cantidad && item.cantidad > 0 ? item.cantidad : 1;
      this.carritoService.agregar(item, cantidad);
    }

     mostrarDescripcion(producto: Producto) {
      this.productoSeleccionado = producto;
    }
}

