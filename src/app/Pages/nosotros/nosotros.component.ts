import { Component } from '@angular/core';
import datosEjecutivos from '../../../assets/json/datosEjecutivos.json';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
    ejecutivos = datosEjecutivos;

    ngOnInit(): void {}
}
