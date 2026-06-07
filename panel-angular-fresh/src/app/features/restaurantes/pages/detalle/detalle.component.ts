import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  restaurante: any = null;

  constructor(
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.restauranteService.obtenerPorId(id).subscribe(data => {
      this.restaurante = data;
    });
  }
}
