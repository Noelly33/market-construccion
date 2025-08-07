import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../../services/cliente.service';
import { Inject } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ClienteCuentaDto } from '../../../../core/modelo/cliente-cuenta-dto';


@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  registroForm: FormGroup;
  registroExitoso: boolean = false;
  errorRegistro: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      direccion: [''],
      telefono: ['']
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const dto: ClienteCuentaDto = {
        nombreCompleto: this.registroForm.value.nombre,
        direccion: this.registroForm.value.direccion,
        telefono: this.registroForm.value.telefono,
        estado: true, // Siempre activo al registrarse
        username: this.registroForm.value.username,
        clave: this.registroForm.value.password
      };

      this.clienteService.insertarCliente(dto).subscribe({
        next: (res) => {
          this.registroExitoso = true;
          this.errorRegistro = null;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorRegistro = 'Error al registrar cliente.';
          this.registroExitoso = false;
        }
      });
      console.log('Formulario enviado:', this.registroForm.value);
    }
  }
}