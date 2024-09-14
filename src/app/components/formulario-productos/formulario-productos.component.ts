import { Component, OnInit } from '@angular/core';
import { Productos } from '../../Utils/productos';
import { ProductoService } from '../../service/producto.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-productos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario-productos.component.css'],
})
export class FormularioProductosComponent implements OnInit {
  producto: Productos = {
    id: '',
    nombre: '',
    marca: '',
    modelo: '',
    precio: 0,
    imagen: '',
    detalles: '',
  };

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          return this.productoService.getProductoPorId(id);
        })
      )
      .subscribe({
        next: (producto) => {
          if (producto) {
            this.producto = producto;
          } else {
            console.error('producto no encontrado');
          }
        },
        error: (error) => {
          console.error('error al cargar el producto', error);
        },
      });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.producto.id) {
        //EDITA EXISTENTE
        this.productoService
          .putProducto(this.producto.id, this.producto)
          .subscribe({
            next: (response) => {
              form.resetForm();
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('no se pudo actualizar', error);
            },
          });
      } else {
        //CREA UNNO NUEVO
        this.productoService.postProducto(this.producto).subscribe({
          next: (response) => {
            form.resetForm();
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('no se guardo el producto', error);
          },
        });
      }
    } else {
      console.error('Error del formulario');
    }
  }
  
}
