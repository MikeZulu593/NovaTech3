import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa Router
import { AuthService } from '../../service/auth.service';
import { auth } from '../../firebase-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, CommonModule], 
})
export class NavbarComponent implements OnInit {
  autenticado: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    auth.onAuthStateChanged((usuario) => {
      this.autenticado = !!usuario;
    });
  }

  manejarAutenticacion() {
    if (this.autenticado) {
      this.authService
        .signOut()
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error('Error al cerrar sesión:', error);
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

