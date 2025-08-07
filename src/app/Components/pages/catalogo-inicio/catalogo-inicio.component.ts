import { Component, inject, OnInit } from '@angular/core';
import { ProductoService} from '../../../services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { CompraService } from '../../../services/compra.service';
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
      const cantidad = item.stock && item.stock > 0 ? item.stock : 1;
      const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

      // Verifica si ya está el producto en el carrito
      const index = carrito.findIndex((c: any) => c.producto.id_Producto === item.id_Producto);
      if (index >= 0) {
        carrito[index].cantidad += cantidad;
      } else {
        carrito.push({ producto: item, cantidad: cantidad });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert('Producto agregado al carrito');
    }

        mostrarDescripcion(producto: Producto) {
          this.productoSeleccionado = producto;
        }
   }

