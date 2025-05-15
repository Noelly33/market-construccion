import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, FormsModule ],
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

  public IniciarSesion() :void {
    console.log('Validando:', this.username, this.password); // Debug
  
    if (this.authService.login(this.username, this.password)) {
      this.snackBar.open('Acceso concedido', 'Cerrar', { duration: 2000 });

      const role = this.authService.getCurrentRole();
      console.log('Rol detectado:', role); // Debug opcional
  
      if (role === 'admin') {
        this.router.navigate(['/paginaprincipal-admin']); // Redirigir a Dashboard de Admin
      } else if (role === 'user') {
        this.router.navigate(['/catalogo-inicio']); // Redirigir a página de usuario normal
      }
  
    } else {
      this.snackBar.open('Error: Usuario o contraseña incorrectos', 'Cerrar', { duration: 3000 });
    }
  }
}



