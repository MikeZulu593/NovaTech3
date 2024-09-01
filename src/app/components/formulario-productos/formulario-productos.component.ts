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
          console.log('ID recibido de la URL:', id);
          return this.productoService.getProductoPorId(id);
        })
      )
      .subscribe({
        next: (producto) => {
          if (producto) {
            this.producto = producto;
            console.log('Producto cargado para editar:', this.producto);
          } else {
            console.error('Producto no encontrado');
          }
        },
        error: (error) => {
          console.error('Error al cargar el producto', error);
        },
      });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.producto.id) {
        // Editar producto existente
        this.productoService
          .putProducto(this.producto.id.toString(), this.producto)
          .subscribe({
            next: (response) => {
              form.resetForm();
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Error, no se pudo actualizar', error);
            },
          });
      } else {
        // Crear un nuevo producto
        this.productoService.postProducto(this.producto).subscribe({
          next: (response) => {
            form.resetForm();
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Producto no guardado', error);
          },
        });
      }
    } else {
      console.error('Error del formulario');
    }
  }
}
