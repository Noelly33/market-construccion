import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core'; // Necesario para acceder a los servicios en función
import { Router } from '@angular/router';  // Asegúrate de importar Router

// Definimos la función del guard como CanActivateFn
export const authGuard: CanActivateFn = (route, state) => {
  // Accedemos a los servicios mediante 'inject'
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Verificamos si el usuario está autenticado
  if (authService.isLoggedIn()) {
    return true; // Permite el acceso si está autenticado
  } else {
    return router.createUrlTree(['/login']); // Redirige al login si no está autenticado
  }
};

