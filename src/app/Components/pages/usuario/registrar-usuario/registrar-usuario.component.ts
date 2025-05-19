import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../../services/cliente.service';
import { Inject } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  registroForm: FormGroup;
  registroExitoso: boolean = true;
  errorRegistro: string | null = null;




  constructor(
    @Inject(ClienteService) private clienteservice: ClienteService,
    
    private clienteService: ClienteService,
    private router: Router,
    private fb: FormBuilder
  ) {
    
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      direccion: [''],
      telefono: [''],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const clientes = JSON.parse(localStorage.getItem('clientes_registrados') || '[]');
      const username = this.registroForm.value.username;

      const existe = clientes.find((c: any) => c.username === username);

      if (existe) {
        this.errorRegistro = 'El nombre de usuario ya está registrado.';
        this.registroExitoso = false;
        return;
      }

      const nuevoUsuario = {
        ...this.registroForm.value,
        id: Date.now(),
        fechaRegistro: new Date().toISOString(),
        role: 'user',
        activo: true // estado activo al registrar
      };

      clientes.push(nuevoUsuario);
      localStorage.setItem('clientes_registrados', JSON.stringify(clientes));

      this.registroExitoso = true;
      this.errorRegistro = null;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }
}