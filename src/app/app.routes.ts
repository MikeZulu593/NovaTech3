import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DetallesProductoComponent } from './Pages/home/detalles-producto/detalles-producto.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { Error404Component } from './Pages/error404/error404.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detalles-producto/:id', component: DetallesProductoComponent },
    { path: 'nosotros', component: NosotrosComponent },

    {path: '**', component: Error404Component}
    
];
