import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecetaService } from '../../services/receta.service';
import { RestauranteService } from '../../../restaurantes/services/restaurante.service';
import { PlatoService } from '../../../platos/services/plato.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {
  form: FormGroup;
  restaurantes: any[] = [];
  platos: any[] = [];
  selectedFile: File | null = null;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private restauranteService: RestauranteService,
    private platoService: PlatoService,
    private notificacion: NotificacionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      plato_id: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      ingredientes_detallados: [''],
      pasos: [''],
      tiempo_preparacion: [''],
      dificultad: [''],
      pdf_url: [''],
      video_url: ['']
    });
  }

  ngOnInit(): void {
    this.restauranteService.listar({ limit: 100 }).subscribe(res => {
      this.restaurantes = res.data;
    });
  }

  onRestauranteChange(restauranteId: string): void {
    if (restauranteId) {
      this.platoService.listarPorRestaurante(restauranteId).subscribe(data => {
        this.platos = data;
      });
    } else {
      this.platos = [];
    }
    this.form.patchValue({ plato_id: '' });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0] as File;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.cargando = true;

    const formData = new FormData();
    formData.append('plato_id', this.form.value.plato_id);
    formData.append('titulo', this.form.value.titulo);

    if (this.form.value.descripcion) formData.append('descripcion', this.form.value.descripcion);
    if (this.form.value.tiempo_preparacion) formData.append('tiempo_preparacion', this.form.value.tiempo_preparacion);
    if (this.form.value.dificultad) formData.append('dificultad', this.form.value.dificultad);
    if (this.form.value.pdf_url) formData.append('pdf_url', this.form.value.pdf_url);
    if (this.form.value.video_url) formData.append('video_url', this.form.value.video_url);

    // Arrays (Listas de texto) a JSON string
    const ingredientes = this.form.value.ingredientes_detallados
      ? this.form.value.ingredientes_detallados.split(',').map((s: string) => s.trim())
      : [];
    formData.append('ingredientes_detallados', JSON.stringify(ingredientes));

    const pasos = this.form.value.pasos
      ? this.form.value.pasos.split(';').map((s: string) => s.trim())
      : [];
    formData.append('pasos', JSON.stringify(pasos));

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.recetaService.crear(formData).subscribe({
      next: () => {
        this.cargando = false;
        this.notificacion.mostrarExito('Receta creada exitosamente');
        this.router.navigate(['/recetas']);
      },
      error: () => {
        this.cargando = false;
        this.notificacion.mostrarError('Error al crear receta');
      }
    });
  }
}
