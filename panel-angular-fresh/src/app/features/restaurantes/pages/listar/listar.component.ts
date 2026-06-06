import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestauranteService } from '../../services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {
  restaurantes: any[] = []; // ✅ Usamos una sola variable
  total = 0;
  limit = 10;
  offset = 0;
  columnas = [
    { titulo: 'Nombre', campo: 'nombre' },
    { titulo: 'Dirección', campo: 'direccion' },
    { titulo: 'Estado', campo: 'estado' }
  ];
  puedeCrear = false;
  puedeEditar = false;
  filtrosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private router: Router,
    private authService: AuthService
  ) {
    this.filtrosForm = this.fb.group({
      tipo_comida: [''],
      precio_min: [null],
      precio_max: [null],
      radio: [null],
      latitud: [null],
      longitud: [null],
      estado_aprobacion: ['todos']
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.puedeCrear = user?.rol === 'admin' || user?.rol === 'proveedor';
    this.puedeEditar = this.puedeCrear;
    this.cargarRestaurantes();
  }

  cargarRestaurantes(): void {
    const params: any = {
      limit: this.limit,
      offset: this.offset,
      ...this.filtrosForm.value
    };

    // Limpiar valores nulos o vacíos
    Object.keys(params).forEach(key => {
      if (params[key] === null || params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    });

    // ✅ Convertir filtro de aprobación al parámetro que entiende el backend
    if (params.estado_aprobacion) {
      if (params.estado_aprobacion === 'aprobados') {
        params.solo_aprobados = true;
      } else if (params.estado_aprobacion === 'pendientes') {
        params.solo_aprobados = false;
      }
      delete params.estado_aprobacion;
    }

    this.restauranteService.listar(params).subscribe(res => {
      // ✅ Asignar directamente a restaurantes
      this.restaurantes = res.data.map((r: any) => ({
        ...r,
        estado: r.aprobado ? 'Aprobado' : 'Pendiente'
      }));
      this.total = res.total;
    });
  }

  aplicarFiltros(): void {
    this.offset = 0;
    this.cargarRestaurantes();
  }

  onPageChange(event: any): void {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.cargarRestaurantes();
  }

  obtenerUbicacion(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.filtrosForm.patchValue({
          latitud: pos.coords.latitude,
          longitud: pos.coords.longitude
        });
        this.aplicarFiltros();
        this.notificacion.mostrarExito('Ubicación obtenida');
      }, () => {
        this.notificacion.mostrarError('No se pudo obtener la ubicación');
      });
    } else {
      this.notificacion.mostrarError('Geolocalización no soportada');
    }
  }

  aprobarRestaurante(restaurante: any): void {
    if (!confirm(`¿Aprobar el restaurante "${restaurante.nombre}"?`)) {
      return;
    }
    this.restauranteService.aprobar(restaurante.id).subscribe({
      next: () => {
        this.notificacion.mostrarExito(`Restaurante "${restaurante.nombre}" aprobado`);
        this.cargarRestaurantes();
      },
      error: () => this.notificacion.mostrarError('Error al aprobar')
    });
  }

  irAEditar(restaurante: any): void {
    this.router.navigate(['/restaurantes/editar', restaurante.id]);
  }

  eliminarRestaurante(restaurante: any): void {
    if (confirm(`¿Eliminar el restaurante "${restaurante.nombre}"?`)) {
      this.restauranteService.eliminar(restaurante.id).subscribe(() => {
        this.notificacion.mostrarExito('Restaurante eliminado');
        this.cargarRestaurantes();
      });
    }
  }
}
