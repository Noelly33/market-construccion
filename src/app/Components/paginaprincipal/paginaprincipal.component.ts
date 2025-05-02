import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-paginaprincipal',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, MatIconModule],
  templateUrl: './paginaprincipal.component.html',
  styleUrl: './paginaprincipal.component.css'
})
export class PaginaprincipalComponent {
constructor(public authService: AuthService, private router:Router) { } // Inyectar el servicio de autenticación

public realizarcompra():void{
  this.router.navigate(['/compra']);
  console.log('Realizando compra...'); // Debug
}
}


