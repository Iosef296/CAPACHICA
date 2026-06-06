import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    mat-sidenav { height: 100%; border-right: 1px solid rgba(255,255,255,0.05); }
    mat-sidenav-content { height: 100%; overflow-y: auto; }

    /* Estilos base para los items del menú */
    .nav-item {
      color: #ecf0f1;
      opacity: 0.8;
    }

    /* Efecto Hover */
    .nav-item:hover {
      background: rgba(26, 188, 156, 0.1);
      opacity: 1;
      transform: translateX(4px);
    }
    .nav-item:hover mat-icon {
      color: #1abc9c;
    }
    .nav-item:hover span {
      color: #ffffff;
    }

    /* Estado Activo (Ruta actual) */
    .active-nav {
      background: linear-gradient(90deg, rgba(26,188,156,0.2) 0%, rgba(26,188,156,0.05) 100%) !important;
      border-left: 4px solid #1abc9c;
      opacity: 1;
    }
    .active-nav mat-icon {
      color: #1abc9c !important;
      filter: drop-shadow(0 0 8px rgba(26,188,156,0.6));
    }
    .active-nav span {
      color: #1abc9c !important;
      font-weight: bold;
    }
  `]
})
export class SidebarComponent {
  esAdmin: boolean;

  constructor(private authService: AuthService) {
    this.esAdmin = this.authService.tieneRol('admin');
  }
}
