import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlatoService } from '../../services/plato.service';
import { RestauranteService } from '../../../restaurantes/services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {
  platos: any[] = [];
  columnas = [
    { titulo: 'Nombre', campo: 'nombre' },
    { titulo: 'Restaurante', campo: 'restaurante_id' },
    { titulo: 'Precio', campo: 'precio' }
  ];
  puedeCrear = false;
  puedeEditar = false;
  filtrosForm: FormGroup;
  restaurantes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private platoService: PlatoService,
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private router: Router,
    private authService: AuthService
  ) {
    this.filtrosForm = this.fb.group({
      restaurante_id: ['']
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

  cargarPlatos(): void {
    const restauranteId = this.filtrosForm.value.restaurante_id;
    if (!restauranteId) {
      this.platos = [];
      return;
    }
    this.platoService.listarPorRestaurante(restauranteId).subscribe(data => {
      this.platos = data;
    });
  }

  aplicarFiltros(): void {
    this.cargarPlatos();
  }

  irAEditar(plato: any): void {
    this.router.navigate(['/platos/editar', plato.id]);
  }

  eliminarPlato(plato: any): void {
    if (confirm('¿Eliminar este plato?')) {
      this.platoService.eliminar(plato.id).subscribe(() => {
        this.notificacion.mostrarExito('Plato eliminado');
        this.cargarPlatos();
      });
    }
  }
}
