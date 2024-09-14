import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../Utils/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //CONEXIÓN CON SPRING BOOT
  private API_URL = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  //AGREGAR
  postProducto(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(`${this.API_URL}`, producto);
  }

  //GET
  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.API_URL}`);
  }

  //DELETE
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  //PUT
  putProducto(id: number, producto: Productos): Observable<Productos> {
    return this.http.put<Productos>(`${this.API_URL}/${id}`, producto);
  }

  //DELETE POR ID
  getProductoPorId(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.API_URL}/${id}`);
  }
}
