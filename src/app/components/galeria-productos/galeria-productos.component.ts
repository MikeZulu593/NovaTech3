import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Productos } from '../../Utils/productos';

@Component({
  selector: 'app-galeria-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-productos.component.html',
  styleUrls: ['./galeria-productos.component.css']
})
export class GaleriaProductosComponent {
  @Input() productos: Productos[] = [];

  constructor(private router: Router) {}

  verDetalles(id: number) {
    this.router.navigate(['/detalles-producto', id]);
  }
}
