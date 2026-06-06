import { Component, OnInit } from '@angular/core';
import { TallerService } from '../../services/taller.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  taller: any = null;

  constructor(
    private tallerService: TallerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tallerService.obtenerPorId(id).subscribe(data => {
      this.taller = data;
    });
  }
}
