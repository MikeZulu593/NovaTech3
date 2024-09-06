import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Verificamos si el usuario está autenticado mediante Firebase
  const usuario = authService.getCurrentUser();

  if (!usuario) {
    // Si no está autenticado, redirige al login
    router.navigate(['/login']);
    return false;
  }

  // Si está autenticado, permite el acceso
  return true;
};
