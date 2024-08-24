import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import datosProductos from '../../../../assets/json/datosProductos.json';
import { Productos } from '../../../Utils/productos';
import { FooterComponent } from '../../../components/footer/footer.component';


@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css'],
  imports: [FooterComponent]
})
export class DetallesProductoComponent implements OnInit {
  producto!: Productos;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 6) {
      this.router.navigate(['/error404']);
      return;
    }

    const foundProduct = (datosProductos as Productos[]).find(p => p.id === id);

    if (!foundProduct) {
      this.router.navigate(['/error404']);
    } else {
      this.producto = foundProduct;
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
