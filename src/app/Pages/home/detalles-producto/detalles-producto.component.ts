import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from '../../../Utils/productos';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ProductoService } from '../../../service/producto.service';

@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css'],
  imports: [FooterComponent],
})
export class DetallesProductoComponent implements OnInit {
  producto!: Productos;

  //INYECTANDO LOS SERVICIOS
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.getProductos().subscribe((data: any) => {
        const encontrarProducto = data[id];
        if (encontrarProducto) {
          this.producto = { ...encontrarProducto, id };
        } else {
          console.error("Producto no encontrado");
          this.router.navigate(['/error404']);
        }
      });
    } else {
      console.error("ID no encontrado en la URL");
      this.router.navigate(['/error404']);
    }
  }
  

  volver(): void {
    this.router.navigate(['/']);
  }
}
