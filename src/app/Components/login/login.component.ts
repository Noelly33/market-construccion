import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  public IniciarSesion(): void {
    console.log('Validando:', this.username, this.password);

    // login como usuario estático (admin/user)
    if (this.authService.login(this.username, this.password)) {
      this.snackBar.open('Acceso concedido (sistema)', 'Cerrar', { duration: 2000 });

      const role = this.authService.getCurrentRole();
      if (role === 'admin') {
        this.router.navigate(['/paginaprincipal-admin']);
      } else {
        this.router.navigate(['/catalogo-inicio']);
      }

    // login como cliente registrado
    } else if (this.clienteService.Login(this.username, this.password)) {
      this.snackBar.open('Acceso concedido (cliente)', 'Cerrar', { duration: 2000 });

     
      const cliente = this.clienteService.getClienteActual(this.username);
      console.log('Cliente logueado:', cliente);

      this.router.navigate(['/catalogo-inicio']);

    } else {
      this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', { duration: 3000 });
    }
  }
}
