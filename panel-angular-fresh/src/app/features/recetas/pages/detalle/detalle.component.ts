import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from '@core/services/notificacion.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  receta: any = null;

  constructor(
    private recetaService: RecetaService,
    private route: ActivatedRoute,
    private notificacion: NotificacionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.recetaService.obtenerPorId(id).subscribe(data => {
      this.receta = data;
    });
  }

  descargarPdf(): void {
    if (!this.receta?.pdf_url) {
      this.notificacion.mostrarError('No hay PDF disponible');
      return;
    }
    // Opción 1: abrir en nueva pestaña
    window.open(this.receta.pdf_url, '_blank');
    // Opción 2: descargar como blob (si el backend lo soporta)
    // this.recetaService.descargarPdf(this.receta.id).subscribe(blob => {
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = `receta-${this.receta.id}.pdf`;
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // });
  }
}
