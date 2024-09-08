import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authCartGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); //TRAE EL SERVICIO DE AUTENTICACION
  const router = inject(Router); //ROUTER

  const user = authService.getCurrentUser();
  if (user) {
    //EL USUARIO ACCEDE AL CARRITO SÓLO SI ESTÁ AUTENTICADO
    return true;
  } else {
    //LO REDIRIGE AL LOGIN
    router.navigate(['/login']);
    return false;
  }
};
