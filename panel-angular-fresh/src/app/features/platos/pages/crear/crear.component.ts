import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatoService } from '../../services/plato.service';
import { RestauranteService } from '../../../restaurantes/services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {
  form: FormGroup;
  restaurantes: any[] = [];
  selectedFile: File | null = null;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private platoService: PlatoService,
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      restaurante_id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      ingredientes: [''],
      categoria: [''],
      temporada: [''],
      es_recomendado: [false]
    });
  }

  ngOnInit(): void {
    this.restauranteService.listar({ limit: 100 }).subscribe(res => {
      this.restaurantes = res.data;
    });
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
    formData.append('restaurante_id', this.form.value.restaurante_id);
    formData.append('nombre', this.form.value.nombre);

    if (this.form.value.descripcion) {
      formData.append('descripcion', this.form.value.descripcion);
    }

    // Numéricos y booleanos como string
    formData.append('precio', String(this.form.value.precio));
    formData.append('es_recomendado', String(this.form.value.es_recomendado));

    if (this.form.value.categoria) formData.append('categoria', this.form.value.categoria);
    if (this.form.value.temporada) formData.append('temporada', this.form.value.temporada);

    // Array a JSON string
    const ingredientes = this.form.value.ingredientes
      ? this.form.value.ingredientes.split(',').map((s: string) => s.trim())
      : [];
    formData.append('ingredientes', JSON.stringify(ingredientes));

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.platoService.crear(formData).subscribe({
      next: () => {
        this.cargando = false;
        this.notificacion.mostrarExito('Plato creado exitosamente');
        this.router.navigate(['/platos']);
      },
      error: () => {
        this.cargando = false;
        this.notificacion.mostrarError('Error al crear plato');
      }
    });
  }
}
