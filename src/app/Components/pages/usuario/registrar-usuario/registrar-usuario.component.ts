import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../../services/cliente.service';
import { Inject } from '@angular/core';

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
      telefono: ['']
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const registroExitoso = this.clienteService.registrarCliente(this.registroForm.value);
      
      if (registroExitoso) {
        this.registroExitoso = true;
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirige después de 2 segundos
        }, 2000);
      } else {
        this.errorRegistro = 'El nombre de usuario ya está registrado.';
      }
    }
}
}