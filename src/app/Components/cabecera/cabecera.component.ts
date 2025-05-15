import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  constructor (public authService: AuthService,
    private router: Router // Inyectar el servicio de enrutamiento
  ) { } // Inyectar el servicio de autenticación
  
  public mostrarCarrito(): boolean {
    return this.authService.isLoggedIn() && !this.router.url.includes('paginaprincipal-admin');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  public registrarUsuario():void{
    this.router.navigate(['/registrar-usuario', 0]);
    console.log('Registrar usuario...');
  }

  public realizarCompra():void{
    this.router.navigate(['/carrito-listar']);
  }
}