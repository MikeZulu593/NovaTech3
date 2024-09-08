import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DetallesProductoComponent } from './Pages/home/detalles-producto/detalles-producto.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { Error404Component } from './Pages/error404/error404.component';
import { FormularioProductosComponent } from './components/formulario-productos/formulario-productos.component';
import { FormularioComponent } from './Pages/formulario/formulario.component';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { CarritoComponent } from './components/carrito/carrito.component';
import { authCartGuard } from './guards/auth-cart.guard';

export const routes: Routes = [
  {path: 'login', component: FormularioLoginComponent},
  {path: 'registro', component: FormularioRegistroComponent},
  
  {path: 'admin', component: AdminComponent, canActivate: [authGuard]},
  { path: 'carrito', component: CarritoComponent, canActivate: [authCartGuard] },
  { path: '', component: HomeComponent },
  { path: 'detalles-producto/:id', component: DetallesProductoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  {path: 'formulario', component: FormularioComponent},
  { path: 'agregarProducto', component: FormularioProductosComponent },
  { path: 'carrito', component: CarritoComponent },

  { path: '**', component: Error404Component },
];
