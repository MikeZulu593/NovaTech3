import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import datosProductos from '../../../assets/json/datosProductos.json';
import datosCarrusel from '../../../assets/json/datosCarrusel.json';
import { Productos } from '../../Utils/productos';
import { GaleriaProductosComponent } from '../../components/galeria-productos/galeria-productos.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GaleriaProductosComponent, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productos: Productos[] = datosProductos as Productos[];
  carrusel = datosCarrusel;
}
