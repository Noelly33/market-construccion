import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { Carrito } from '../../../core/modelo/carrito';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PagoFinalComponent } from '../pago-final/pago-final.component';  
import { TransportistaService } from '../../../services/transportista.service';
import { FormsModule } from '@angular/forms';
import { Transportista } from '../../../core/modelo/transportista';



  @Component({
    selector: 'app-carrito-listar',
    standalone: true,
    imports: [CommonModule, MatDialogModule, FormsModule ],
    templateUrl: './carrito-listar.component.html',
    styleUrls: ['./carrito-listar.component.css']
  })
    export class CarritoListarComponent implements OnInit {

      constructor(private dialog: MatDialog,
      private carritoService: CarritoService,
      private transportistaService: TransportistaService) {}
  
      listCarrito: Carrito[] = [];
      metodoEntrega: string = 'bodega';
      direccion: string = '';
      transportistaSeleccionado: Transportista | null = null;
      listaTransportistas: Transportista[] = [];

      ngOnInit(): void {
        this.getListCarrito();
        this.cargarTransportistas();
      }

      getListCarrito() {
        this.listCarrito = this.carritoService.getCarrito();
      }
      
      eliminarItem(index: number): void {
        this.carritoService.eliminar(index); 
        this.getListCarrito();     
      }

      calcularTotal(): number {
        return this.listCarrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
      }
      cargarTransportistas() {
        this.transportistaService.getTransportistas().subscribe(data => {
          this.listaTransportistas = data;
        });
      }

      procesarPago(): void {
        if (this.metodoEntrega === 'domicilio') {
          if (!this.direccion || !this.transportistaSeleccionado) {
            alert('Debe ingresar la dirección y seleccionar un transportista.');
            return;
          }
          console.log('Entrega a domicilio');
          console.log('Dirección:', this.direccion);
          console.log('Transportista:', this.transportistaSeleccionado);
        } else {
          console.log('Retiro en bodega');
        }

      this.dialog.open(PagoFinalComponent, {
        width: '500px',
        data: {
          metodoEntrega: this.metodoEntrega,
          direccion: this.direccion,
          transportista: this.transportistaSeleccionado
        }
      });
  }
}
  

