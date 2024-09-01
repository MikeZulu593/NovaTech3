import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Productos } from '../Utils/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //CONEXION A FIREBASE
  private API_FIRE = 'https://app-angular-7f1ef-default-rtdb.firebaseio.com/';


  constructor(private http: HttpClient) { }

  // AGREGAR PRODUCTOS
  postProducto(producto: any): Observable<any> {
    return this.http.post(`${this.API_FIRE}.json`, producto);
  }
  

  // OBTENER PRODUCTOS
  getProductos(): Observable<any> {
    return this.http.get(`${this.API_FIRE}.json`);
  }

  // ELIMINAR PRODUCTO
  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIRE}/${id}.json`);
  }

  // ACTUALIZAR PRODUCTO
  putProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.API_FIRE}/${id}.json`, producto);
  }

  // OBTENER PRODUCTO POR ID (PARA TRAERLO AL FORMULARIO DE EDICION)
  getProductoPorId(id: string): Observable<Productos | undefined> {
    return this.http.get(`${this.API_FIRE}/${id}.json`).pipe(
      map((producto: any) => {
        if (producto) {
          return { ...producto, id } as Productos; 
        } else {
          return undefined;
        }
      })
    );
  }
  
}
