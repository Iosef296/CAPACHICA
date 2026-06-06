import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  restaurante: any = null;
  esAdmin = false;

  constructor(
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.authService.tieneRol('admin');
    const id = this.route.snapshot.params['id'];
    this.restauranteService.obtenerPorId(id).subscribe(data => {
      this.restaurante = data;
    });
  }

  aprobar(): void {
    if (!this.esAdmin) {
      this.notificacion.mostrarError('Solo administradores pueden aprobar');
      return;
    }
    this.restauranteService.aprobar(this.restaurante.id).subscribe(() => {
      this.notificacion.mostrarExito('Restaurante aprobado');
      this.restaurante.aprobado = true;
    });
  }
}
