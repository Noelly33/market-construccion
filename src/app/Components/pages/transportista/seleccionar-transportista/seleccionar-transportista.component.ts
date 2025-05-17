import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TransportistaService} from '../../../../services/transportista.service';
import { Transportista } from '../../../../core/modelo/transportista';

@Component({
  selector: 'app-select-transportista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seleccionar-transportista.component.html',
  styleUrl: './seleccionar-transportista.component.css'
})

export class SelectTransportistaComponent implements OnInit {

    transportistas: Transportista[] = [];
    transportistaSeleccionado: Transportista | null = null;

  constructor(
    private transportistaService: TransportistaService,
    private dialogRef: MatDialogRef<SelectTransportistaComponent>
  ) {}

    ngOnInit() {
      this.transportistaService.getTransportistas().subscribe((data) => {
        this.transportistas = data;
      });
    }

    confirmarSeleccion() {
      if (this.transportistaSeleccionado) {
        this.dialogRef.close(this.transportistaSeleccionado);
      }
    }

    cancelar() {
      this.dialogRef.close();
    }
}
