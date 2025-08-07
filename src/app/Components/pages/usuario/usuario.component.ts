import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog,   MatDialogModule } from '@angular/material/dialog';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component'; 
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../core/modelo/cliente';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent implements OnInit {
  filtro: string = '';
   usuarios: any[] = [];
   clienteSeleccionado: any = null;
  fechaRegistro: string = new Date().toISOString();

  seleccionarUsuario(usuario: any) {
    if (this.clienteSeleccionado?.username === usuario.username) {
      this.clienteSeleccionado = null; // si ya está seleccionado, se deselecciona
    } else {
      this.clienteSeleccionado = usuario;
    }
  }
    
  clientes: Cliente[] = [];
  constructor(private dialog: MatDialog, private clienteService: ClienteService) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.obtenerTodosLosClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al cargar transportistas', err);
      }
    });
  }

  get datosFiltrados() {
    return this.clientes.filter(t =>
    t.nombreCompleto.toLowerCase().includes(this.filtro.toLowerCase()))
  }

  usuarioSeleccionado(c: Cliente) {
      this.clienteSeleccionado = this.clienteSeleccionado?.id_Cliente === c.id_Cliente ? null : c;
    }
  
  
    editar(c: Cliente) {
      const dialogRef = this.dialog.open(EditarUsuarioComponent, {
        width: '400px',
        data: { ...c }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clienteService.actualizarCliente(result).subscribe({
            next: () => {
              // ✅ Volver a cargar transportistas luego de la actualización
              this.clienteService.obtenerTodosLosClientes().subscribe(data => {
                this.clientes = data;
                this.clienteSeleccionado = null;
              });
            },
            error: err => {
              console.error('Error al actualizar transportista:', err);
              alert('Ocurrió un error al actualizar el transportista.');
            }
          });
        }
      });
    }
    
}
  

