import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TallerService } from '../../services/taller.service';
import { RestauranteService } from '../../../restaurantes/services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {
  talleres: any[] = [];
  total = 0;
  limit = 10;
  offset = 0;
  columnas = [
    { titulo: 'Nombre', campo: 'nombre' },
    { titulo: 'Precio', campo: 'precio' },
    { titulo: 'Duración', campo: 'duracion' }
  ];
  puedeCrear = false;
  puedeEditar = false;
  filtrosForm: FormGroup;
  restaurantes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private tallerService: TallerService,
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private router: Router,
    private authService: AuthService
  ) {
    this.filtrosForm = this.fb.group({
      restaurante_id: [''],
      precio_min: [null],
      precio_max: [null],
      duracion: ['']
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.puedeCrear = user?.rol === 'admin' || user?.rol === 'proveedor';
    this.puedeEditar = this.puedeCrear;

    this.restauranteService.listar({ limit: 100 }).subscribe(res => {
      this.restaurantes = res.data;
    });
  }

  cargarTalleres(): void {
    const restauranteId = this.filtrosForm.value.restaurante_id;
    if (!restauranteId) {
      this.talleres = [];
      this.total = 0;
      return;
    }

    const params: any = {
      limit: this.limit,
      offset: this.offset,
      ...this.filtrosForm.value
    };
    delete params.restaurante_id;

    this.tallerService.listarPorRestaurante(restauranteId, params).subscribe(res => {
      this.talleres = res.data;
      this.total = res.total;
    });
  }

  aplicarFiltros(): void {
    this.offset = 0;
    this.cargarTalleres();
  }

  onPageChange(event: any): void {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.cargarTalleres();
  }

  irAEditar(taller: any): void {
    this.router.navigate(['/talleres/editar', taller.id]);
  }

  eliminarTaller(taller: any): void {
    if (confirm('¿Eliminar este taller?')) {
      this.tallerService.eliminar(taller.id).subscribe(() => {
        this.notificacion.mostrarExito('Taller eliminado');
        this.cargarTalleres();
      });
    }
  }
}
