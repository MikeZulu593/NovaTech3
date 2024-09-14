import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Productos } from '../../Utils/productos';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-galeria-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-productos.component.html',
  styleUrls: ['./galeria-productos.component.css'],
})
export class GaleriaProductosComponent implements OnInit {
  @Input() productos: Productos[] = [];
  logueado = false;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: Productos[]) => {
      this.productos = data;
    });

    // V E R I F I C A    I N I C I O    D E    S E S I O N
    if (localStorage.getItem('login') === 'true') {
      this.logueado = true;
    }
  }

  verDetalles(id: number) {
    this.router.navigate(['/detalles-producto', id]);
  }
}
