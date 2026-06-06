import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../../services/plato.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  plato: any = null;

  constructor(
    private platoService: PlatoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.platoService.obtenerPorId(id).subscribe(data => {
      this.plato = data;
    });
  }
}
