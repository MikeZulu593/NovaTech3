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

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: any) => {
      this.productos = Object.keys(data).map((key) => ({
        ...data[key],
        id: key, //KEY DE FIREBASE
      }));
    });
  }

  verDetalles(id: number) {
    this.router.navigate(['/detalles-producto', id]);
  }

  editarProducto(producto: Productos) {
    this.router.navigate(['/formulario'], { queryParams: { id: producto.id } }); //CON ESTO QUIERO CARGAR EL PRODUCTO DIRECTO DESDE LA BASE DE DATOS, YA QUE NO FUNCIONA GETCURRENTNAVIATION
  }

  eliminarProducto(id: string) {
    this.productoService.deleteProducto(id).subscribe( //AUN ASI FUNCIONA
      (response) => {
        console.log('Sí se eliminó', response);
        this.productos = this.productos.filter((p) => p.id !== id);
      },
      (error) => {
        console.error('no se eliminó', error);
      }
    );
  }
}
