import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getRoleFromToken();

    // Rutas que requieren roles específicos
    const expectedRole = route.data['role']; // ← viene desde la ruta

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole && userRole !== expectedRole) {
      // Redirige si no tiene el rol necesario
      this.router.navigate(['/catalogo-inicio']);
      return false;
    }

    return true;
  }
}
