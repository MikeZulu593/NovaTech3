import { Component } from '@angular/core';
import { Productos } from '../../Utils/productos';
import { CarritoComprasService } from '../../service/carrito-compras.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  productos: Productos[] = [];
  total: number = 0;
  IVA: number = 0.15;
  totalConIVA: number = 0;
  constructor(private carritoService: CarritoComprasService) {}

  ngOnInit(): void {
    this.carritoService
      .obtenerCarritoDelCliente()
      .subscribe((productos: any) => {
        this.productos = Object.keys(productos).map((key) => productos[key]);
        this.calcularTotal();
      });
  }

  calcularTotal() {
    this.total = this.productos.reduce(
      (acc, producto) => acc + producto.precio,
      0
    );
    this.totalConIVA = this.total + this.total * this.IVA;
  }

  generarFactura() {
    console.log('Factura generada');
    console.log('Total: ', this.total);
    console.log('Total con IVA: ', this.totalConIVA);

    this.carritoService.vaciarCarrito().subscribe(() => {});
  }

  finalizarCompra() {
    this.carritoService.vaciarCarrito().subscribe(() => {
      window.alert('Gracias por su compra');
    });
  }
}
