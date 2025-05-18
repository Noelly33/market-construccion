import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-paginaprincipal-admin',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule], 
  templateUrl: './paginaprincipal-admin.component.html',
  styleUrl: './paginaprincipal-admin.component.css'

})
export class PaginaprincipalAdminComponent {
  
  constructor(private router:Router){}

  public administrarTransportista():void{
    this.router.navigate(['transportista']);
    console.log('Ver transportistas...'); 
  }

  public administrarUsuario():void{
    this.router.navigate(['usuario']);
    console.log('Ver usuarios...'); 
  }

  public administrarProducto(): void {
    this.router.navigate(['producto']);
    console.log('Ver productos...'); 
  }
  
}
