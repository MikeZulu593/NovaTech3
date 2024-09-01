import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa Router
import { AuthService } from '../../service/auth.service';
import { auth } from '../../firebase-config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule] 
})
export class NavbarComponent {
  autenticado: boolean = false;

  constructor(private authService: AuthService, private router: Router) {} 

  ngOnInit(): void {
    auth.onAuthStateChanged((usuario) => {
      this.autenticado = !!usuario;
    });
  }

  manejarAutenticacion() {
    if (this.autenticado) {
      this.authService.signOut().then(() => {
        this.router.navigate(['/login']); //NAVEGA AL LOGIN
      }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
