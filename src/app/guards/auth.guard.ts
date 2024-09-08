import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //VERIFICA AUTENTICACION POR MEDIO DEL SERVICIO DE FIREBASE
  const usuario = authService.getCurrentUser();

  if (!usuario) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
