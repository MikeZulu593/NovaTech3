import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import datosCarrusel from '../../../assets/json/datosCarrusel.json';
import { Productos } from '../../Utils/productos';
import { GaleriaProductosComponent } from '../../components/galeria-productos/galeria-productos.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductoService } from '../../service/producto.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GaleriaProductosComponent,
    NavbarComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productos: Productos[] = [];
  carrusel = datosCarrusel;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: any) => {
      this.productos = Object.keys(data).map((key) => ({
        ...data[key],
        id: key, //KEY DE FIREBASE
      }));
    });
  }
}
