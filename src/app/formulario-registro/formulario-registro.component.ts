import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent {

  email: string = '';
  password: string = '';

  constructor(private autenticacion: AuthService, private router: Router) { }

  onSubmit(): void {
    this.autenticacion.signUp(this.email, this.password).then(() => {  
      this.router.navigate(['/']);
    }).catch((error: any) => {
      console.error('Error en el registro:', error);
    });
  }
}
