import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from '../../../Utils/productos';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ProductoService } from '../../../service/producto.service';
import { CarritoComprasService } from '../../../service/carrito-compras.service';
import { AuthService } from '../../../service/auth.service';

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
    private productoService: ProductoService,
    private carritoService: CarritoComprasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productoService.getProductoPorId(id).subscribe((producto) => {
        this.producto = producto;
      }, error => {
        console.error("no se encontro el producto", error);
        this.router.navigate(['/error404']);
      });
    } else {
      console.error("id no encontrado");
      this.router.navigate(['/error404']);
    }
  }
  

  agregarAlCarrito() {
  const user = this.authService.getCurrentUser();
  if (!user) {
    window.alert('Debe iniciar sesión para añadir productos al carrito.');
    this.router.navigate(['/login']);
  } else {
    this.carritoService.agregarProductoAlCarrito(this.producto).subscribe(() => {
      window.alert('Producto agregado al carrito con éxito');
    }, (error) => {
      console.error('NO SE GUARDO EL PRODUCTO EN EL CARRITO', error);
    });
  }
}

  

  volver(): void {
    this.router.navigate(['/']);
  }
}
