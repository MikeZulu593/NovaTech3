import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = 'http://localhost:8080/api/ventas'; //API DE SPRING BOOT

  constructor(private http: HttpClient) {}

  agregarVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venta);
  }

  
  
}
