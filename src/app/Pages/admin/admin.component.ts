import { Component, OnInit } from '@angular/core';
import { GaleriaProductosComponent } from "../../components/galeria-productos/galeria-productos.component";
import { FormularioProductosComponent } from "../../components/formulario-productos/formulario-productos.component";
import { CommonModule } from '@angular/common';
import { Productos } from '../../Utils/productos';
import { ProductoService } from '../../service/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [GaleriaProductosComponent, FormularioProductosComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  productos: Productos[] = [];

  constructor(
    private ProductoService: ProductoService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los productos al iniciar
    this.ProductoService.getProductos().subscribe((data: any) => {
      this.productos = Object.keys(data).map((key) => ({
        ...data[key],
        id: key, // ID de Firebase
      }));
    });
  }

  editarProducto(producto: Productos) {
    this.Router.navigate(['/formulario'], { queryParams: { id: producto.id } });
  }

  eliminarProducto(id: string) {
    this.ProductoService.deleteProducto(id).subscribe(
      (response) => {
        console.log('Producto eliminado', response);
        this.productos = this.productos.filter((p) => p.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }
}
