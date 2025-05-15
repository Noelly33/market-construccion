import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrarTransportistaComponent } from './registrar-transportista/registrar-transportista.component';

@Component({
  selector: 'app-transportista',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './transportista.component.html',
  styleUrl: './transportista.component.css'
})
export class TransportistaComponent {

  filtro: string ='';
  transportistaSeleccionado: any = null;

  transportistas = [{
    id: 1,
      nombre: 'Carlos Pérez',
      correo: 'cperez@mail.com',
      cedula: '0923456789',
      empresa: 'TransLogistic',
      telefono: '0991234567',
      activo: true,
      rol: 'Transportista'
  }
  ];
     get datosFiltrados() {
    return this.transportistas.filter(t =>
      t.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      t.empresa.toLowerCase().includes(this.filtro.toLowerCase()) ||
      t.correo.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  constructor(private dialog: MatDialog, private router: Router) {}

  seleccionarUsuario(transportista: any) {
    this.transportistaSeleccionado =
      this.transportistaSeleccionado?.id === transportista.id ? null : transportista;
  }

  abrirRegistro() {
    const dialogRef = this.dialog.open(RegistrarTransportistaComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((nuevo: any) => {
      if (nuevo) {
        const nuevoId = this.transportistas.length ? Math.max(...this.transportistas.map(t => t.id)) + 1 : 1;
        this.transportistas.push({ id: nuevoId, ...nuevo });
      }
    });
  }

  editar(dato: any) {
     this.router.navigate(['/transportista/editar-transportista', dato.id]);
  }

  eliminar(id: number) {
    this.transportistas = this.transportistas.filter(t => t.id !== id);
    this.transportistaSeleccionado = null;
  }


}
