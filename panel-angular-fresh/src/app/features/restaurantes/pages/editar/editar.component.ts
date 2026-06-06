import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestauranteService } from '../../services/restaurante.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {
  form: FormGroup;
  cargando = true;
  enviando = false;
  id!: string;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.restauranteService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        direccion: data.direccion,
        latitud: data.ubicacion?.latitud || 0,
        longitud: data.ubicacion?.longitud || 0,
        whatsapp: data.whatsapp,
        telefono: data.telefono,
        email_contacto: data.email_contacto,
        tipo_comida: data.tipo_comida,
        especialidades: data.especialidades?.join(', ') || '',
        precio_promedio: data.precio_promedio,
        capacidad_mesas: data.capacidad_mesas
      });
      this.cargando = false;
    });
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files) as File[];
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.enviando = true;

    const formData = new FormData();

    // Textos simples
    const camposTexto = ['nombre', 'descripcion', 'direccion', 'whatsapp', 'telefono', 'email_contacto', 'tipo_comida'];
    camposTexto.forEach(campo => {
      const valor = this.form.value[campo];
      if (valor !== null && valor !== undefined && valor !== '') {
        formData.append(campo, String(valor));
      }
    });

    // Números
    if (this.form.value.precio_promedio !== null && this.form.value.precio_promedio !== '') {
      formData.append('precio_promedio', String(this.form.value.precio_promedio));
    }
    if (this.form.value.capacidad_mesas !== null && this.form.value.capacidad_mesas !== '') {
      formData.append('capacidad_mesas', String(this.form.value.capacidad_mesas));
    }

    // Ubicación (Objeto)
    const ubicacion = {
      latitud: Number(this.form.value.latitud),
      longitud: Number(this.form.value.longitud)
    };
    formData.append('ubicacion', JSON.stringify(ubicacion));

    // Array (JSON)
    const especialidades = this.form.value.especialidades
      ? this.form.value.especialidades.split(',').map((s: string) => s.trim())
      : [];
    formData.append('especialidades', JSON.stringify(especialidades));

    // Archivos
    for (const file of this.selectedFiles) {
      formData.append('fotos', file);
    }

    this.restauranteService.actualizar(this.id, formData).subscribe({
      next: () => {
        this.enviando = false;
        this.notificacion.mostrarExito('Restaurante actualizado');
        this.router.navigate(['/restaurantes']);
      },
      error: () => {
        this.enviando = false;
        this.notificacion.mostrarError('Error al actualizar restaurante');
      }
    });
  }
}
