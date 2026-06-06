import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RolGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rolesPermitidos = route.data['roles'] as string[];
    const usuario = this.authService.getCurrentUser();
    if (usuario && rolesPermitidos.includes(usuario.rol)) {
      return true;
    }
    this.router.navigate(['/restaurantes']); // ✅ Redirigir a restaurantes, no a dashboard
    return false;
  }
}
