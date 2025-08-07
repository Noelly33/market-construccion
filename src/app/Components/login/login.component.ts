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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, FormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

 
IniciarSesion(): void {
  this.authService.login(this.username, this.password).subscribe({
   next: (response) => {
  this.authService.guardarToken(response.token, this.username);

  const rol = this.authService.getRoleFromToken();

  if (rol === 'Administrador') {
    this.router.navigate(['/paginaprincipal-admin']);
  } else {
    this.router.navigate(['/catalogo-inicio']);
  }

  this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 2000 });
}
  });

  console.log('Intentando iniciar sesión con:', this.username, this.password);
}
}
