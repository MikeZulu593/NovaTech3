import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {

  email: string = '';
  password: string = '';

  constructor(private autenticacion: AuthService, private router: Router) { }

  onSubmit(): void {
    this.autenticacion.signIn(this.email, this.password).then(() => {
      this.router.navigate(['/']);
    }).catch((error: any) => {
      console.error('Error en el inicio de sesión:', error);
    });
  }

  loginWithGoogle(): void {
    this.autenticacion.signInWithGoogle().then(() => {
      this.router.navigate(['/']);
    }).catch((error: any) => {
      console.error('Fallo de inicio de sesión con google', error);
    });
  }

}
