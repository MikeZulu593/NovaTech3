import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormularioProductosComponent } from '../../components/formulario-productos/formulario-productos.component';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormularioProductosComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

}
