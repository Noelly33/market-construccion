import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrarTransportistaComponent } from './registrar-transportista/registrar-transportista.component';
import { EditarTransportistaComponent } from './editar-transportista/editar-transportista.component';
import { TransportistaService } from '../../../services/transportista.service';
import { Transportista } from '../../../core/modelo/transportista';

@Component({
  selector: 'app-transportista',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './transportista.component.html',
  styleUrl: './transportista.component.css'
})

export class TransportistaComponent implements OnInit {
  
  filtro: string = '';
  transportistas: Transportista[] = [];
  transportistaSeleccionado: Transportista | null = null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private transportistaService: TransportistaService
  ) {}

  ngOnInit() {
    this.transportistaService.getTransportistas().subscribe(data => {
      this.transportistas = data;
    });
  }

  get datosFiltrados() {
    return this.transportistas.filter(t =>
      t.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      t.cedula.toLowerCase().includes(this.filtro.toLowerCase()) 
    );
  }

  seleccionarUsuario(t: Transportista) {
    this.transportistaSeleccionado = this.transportistaSeleccionado?.id === t.id ? null : t;
  }

  abrirRegistro() {
    const dialogRef = this.dialog.open(RegistrarTransportistaComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((nuevo: Transportista) => {
      if (nuevo) {
        this.transportistaService.agregarTransportista(nuevo);
        this.transportistaSeleccionado = null;
      }
    });
  }

  editar(t: Transportista) {
    const dialogRef = this.dialog.open(EditarTransportistaComponent, {
      width: '400px',
      data: { ...t }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transportistaService.actualizarTransportista(result);
      }
    });
  }

  eliminar(id: number) {
    this.transportistaService.eliminarTransportista(id);
    this.transportistaSeleccionado = null;
  }
}
