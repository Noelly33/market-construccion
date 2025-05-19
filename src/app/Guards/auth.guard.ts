import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core'; // Necesario para acceder a los servicios en función
import { Router } from '@angular/router';  


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Verificamos si el usuario está autenticado
  if (authService.isLoggedIn()) {
    return true; // Permite el acceso si está autenticado
  } else {
    return router.createUrlTree(['/login']); // Redirige al login si no está autenticado
  }

};

