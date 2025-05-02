import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './Components/cabecera/cabecera.component';
import { PiepaginaComponent } from './Components/piepagina/piepagina.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthService } from './services/auth.service'; 
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CabeceraComponent,
    PiepaginaComponent,
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Market_Construccion';

  constructor(public authService: AuthService, private router:Router){}  // Inyectar el servicio de autenticación

  allowPublicRoutes(): boolean {
    const publicRoutes = ['/registrar-usuario/0'];  // las rutas que quieres que cualquiera vea
    return publicRoutes.includes(this.router.url);
  }
  
}

