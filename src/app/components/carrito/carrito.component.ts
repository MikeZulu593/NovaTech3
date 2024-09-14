import { Component } from '@angular/core';
import { Productos } from '../../Utils/productos';
import { CarritoComprasService } from '../../service/carrito-compras.service';
import { VentasService } from '../../service/ventas.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { EmailService } from '../../service/email.service';
import { PaypalService } from '../../service/paypal.service';

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

  constructor(
    private carritoService: CarritoComprasService,
    private ventasService: VentasService,
    private authService: AuthService,
    private emailService: EmailService,
    private paypalService: PaypalService
  ) {}

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

  sendEmail(): void {
    this.emailService
      .sendEmail(
        'no-reply@myshop.com',
        'NovaTech',
        'Gracias por tu compra',
        `<h1>Gracias por tu compra</h1>`
      )
      .subscribe();
  }

  //F I N A L I Z A R    C O M P R A    Y GUARDAR EN MYSQL DESPUES DE CONFIRMAR LA COMPRA
  finalizarCompra() {
    const venta = {
      fecha: new Date().toISOString().split('T')[0], //FECHA
      total: this.totalConIVA,
      clienteId: this.authService.getCurrentUser()?.uid, //ID DEL CLIENTE
    };

    this.ventasService.agregarVenta(venta).subscribe(
      () => {
        window.alert('Compra finalizada con éxito');
        this.carritoService.vaciarCarrito().subscribe(() => {});
      },
      (error) => {
        console.error('Error al registrar la venta', error);
      }
    );
  }

  pagarPaypal() {
    //EL PAGO SALE BIEN
    const pagoExitoso = true; 
    
    if (pagoExitoso) {
      window.alert('Pago completado con éxito.');
      this.finalizarCompra();
      window.location.href = 'http://localhost:4200'; 
    } else {
      //SI ELPAGO SALE MAL
      window.alert('Error al procesar el pago.');
      window.location.href = 'http://localhost:4200/error404'; 
    }
  }
  
  //este código es de prueba ya que no fue posible conseguir mi propio id de paypal
  
}
