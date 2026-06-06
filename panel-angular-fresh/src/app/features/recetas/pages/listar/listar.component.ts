import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecetaService } from '../../services/receta.service';
import { PlatoService } from '../../../platos/services/plato.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {
  recetas: any[] = [];
  platos: any[] = [];
  columnas = [
    { titulo: 'Título', campo: 'titulo' },
    { titulo: 'Plato', campo: 'plato_id' },
    { titulo: 'Dificultad', campo: 'dificultad' }
  ];
  puedeCrear = false;
  puedeEditar = false;
  filtrosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private platoService: PlatoService,
    private notificacion: NotificacionService,
    private router: Router,
    private authService: AuthService
  ) {
    this.filtrosForm = this.fb.group({
      plato_id: ['']
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.puedeCrear = user?.rol === 'admin' || user?.rol === 'proveedor';
    this.puedeEditar = this.puedeCrear;

    this.platoService.listarPorRestaurante('').subscribe(data => {
      this.platos = data;
    });
  }

  aplicarFiltros(): void {
    const platoId = this.filtrosForm.value.plato_id;
    if (!platoId) {
      this.recetas = [];
      return;
    }
    this.recetaService.obtenerPorPlato(platoId).subscribe({
      next: data => {
        this.recetas = data ? [data] : [];
      },
      error: () => {
        this.recetas = [];
      }
    });
  }

  irAEditar(receta: any): void {
    this.router.navigate(['/recetas/editar', receta.id]);
  }

  eliminarReceta(receta: any): void {
    if (confirm('¿Eliminar esta receta?')) {
      this.recetaService.eliminar(receta.id).subscribe(() => {
        this.notificacion.mostrarExito('Receta eliminada');
        this.aplicarFiltros();
      });
    }
  }
}
