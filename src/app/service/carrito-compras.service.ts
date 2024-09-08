import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Productos } from '../Utils/productos';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoComprasService {
  //MANTENGO LA MISMA API DE FIREBASE
  private API_FIRE = 'https://app-angular-7f1ef-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //AGREGAR AL CARRITO
  agregarProductoAlCarrito(producto: Productos): Observable<any> {
    const user = this.authService.getCurrentUser(); //SE OBTIENE EL USUARIO AUTENTICADO
    if (user) {
      const userId = user.uid;
      const url = `${this.API_FIRE}/carritos/${userId}.json`; //SE GUARDA BAJO OTRA RAMA DENTRO DEL MISMO USUARIO
      return this.http.post(url, producto); 
    }
    return of([]); //SE DEVUELVE UN OBSERVABLE, NO PODÍA SER NULL
  }

  //GET PRODUCTOS DEL CARRITO DEL CLIENTE
  obtenerCarritoDelCliente(): Observable<any> {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid; // ID del usuario autenticado
      const url = `${this.API_FIRE}/carritos/${userId}.json`;
      return this.http.get(url);
    }
    return of([]);
  }

  //SE LIMPIA EL CARRITO CUANDO SE GENERE LA FACTURA
  vaciarCarrito(): Observable<any> {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const url = `${this.API_FIRE}/carritos/${userId}.json`;
      return this.http.delete(url);
    }
    return of([]);
  }
}
