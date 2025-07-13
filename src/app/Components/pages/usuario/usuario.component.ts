import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog,   MatDialogModule } from '@angular/material/dialog';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component'; 

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, MatDialogModule, EditarUsuarioComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent implements OnInit {
  filtro: string = '';
   usuarios: any[] = [];
   usuarioSeleccionado: any = null;
  fechaRegistro: string = new Date().toISOString();

  seleccionarUsuario(usuario: any) {
  if (this.usuarioSeleccionado?.username === usuario.username) {
    this.usuarioSeleccionado = null; // si ya está seleccionado, se deselecciona
  } else {
    this.usuarioSeleccionado = usuario;
  }
}

   constructor(private dialog: MatDialog) {}

  ngOnInit() {
    const data = localStorage.getItem('clientes_registrados');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  get datosFiltrados() {
    return this.usuarios.filter(t =>
      t.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  editarUsuario(usuarioData: any) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '400px',
      data: { ...usuarioData }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      const index = this.usuarios.findIndex(u => u.username === result.username);
      if (index !== -1) {
        this.usuarios[index] = result;

        localStorage.setItem('clientes_registrados', JSON.stringify(this.usuarios));

        // Actualiza la selección si es el mismo usuario
        this.usuarioSeleccionado = result;
      }
    }
  });
  }
}
