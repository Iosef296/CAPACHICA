import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestauranteService } from '../../services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  form: FormGroup;
  selectedFiles: File[] = [];
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      latitud: [0, Validators.required],
      longitud: [0, Validators.required],
      whatsapp: [''],
      telefono: [''],
      email_contacto: [''],
      tipo_comida: [''],
      especialidades: [''],
      precio_promedio: [null],
      capacidad_mesas: [null]
    });
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files) as File[];
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.cargando = true;

    const formData = new FormData();
    formData.append('nombre', this.form.value.nombre);
    if (this.form.value.descripcion) formData.append('descripcion', this.form.value.descripcion);
    formData.append('direccion', this.form.value.direccion);

    if (this.form.value.whatsapp) formData.append('whatsapp', this.form.value.whatsapp);
    if (this.form.value.telefono) formData.append('telefono', this.form.value.telefono);
    if (this.form.value.email_contacto) formData.append('email_contacto', this.form.value.email_contacto);
    if (this.form.value.tipo_comida) formData.append('tipo_comida', this.form.value.tipo_comida);

    // Números a String
    if (this.form.value.precio_promedio !== null && this.form.value.precio_promedio !== '') {
      formData.append('precio_promedio', String(this.form.value.precio_promedio));
    }
    if (this.form.value.capacidad_mesas !== null && this.form.value.capacidad_mesas !== '') {
      formData.append('capacidad_mesas', String(this.form.value.capacidad_mesas));
    }

    // Ubicación (Objeto a JSON)
    const ubicacion = {
      latitud: Number(this.form.value.latitud),
      longitud: Number(this.form.value.longitud)
    };
    formData.append('ubicacion', JSON.stringify(ubicacion));

    // Especialidades (Array a JSON)
    const especialidades = this.form.value.especialidades
      ? this.form.value.especialidades.split(',').map((s: string) => s.trim())
      : [];
    formData.append('especialidades', JSON.stringify(especialidades));

    // Fotos
    for (const file of this.selectedFiles) {
      formData.append('fotos', file);
    }

    this.restauranteService.crear(formData).subscribe({
      next: () => {
        this.cargando = false;
        this.notificacion.mostrarExito('Restaurante creado exitosamente');
        this.router.navigate(['/restaurantes']);
      },
      error: () => {
        this.cargando = false;
        this.notificacion.mostrarError('Error al crear restaurante');
      }
    });
  }
}
