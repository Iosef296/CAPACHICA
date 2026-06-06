import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TallerService } from '../../services/taller.service';
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
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private tallerService: TallerService,
    private restauranteService: RestauranteService,
    private notificacion: NotificacionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      restaurante_id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      duracion: [''],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      capacidad_maxima: [null],
      horarios: [''],
      incluye_materiales: [true],
      plato_principal: ['']
    });
  }

  ngOnInit(): void {
    this.restauranteService.listar({ limit: 100 }).subscribe(res => {
      this.restaurantes = res.data;
    });
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files) as File[];
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('restaurante_id', this.form.value.restaurante_id);
    formData.append('nombre', this.form.value.nombre);

    if (this.form.value.descripcion) formData.append('descripcion', this.form.value.descripcion);
    if (this.form.value.duracion) formData.append('duracion', this.form.value.duracion);

    formData.append('precio', String(this.form.value.precio));

    if (this.form.value.capacidad_maxima !== null) {
      formData.append('capacidad_maxima', String(this.form.value.capacidad_maxima));
    }

    // Horarios como array JSON
    const horarios = this.form.value.horarios
      ? this.form.value.horarios.split(',').map((s: string) => s.trim())
      : [];
    formData.append('horarios', JSON.stringify(horarios));

    // 🔴 Convertimos explícitamente a string booleano
    formData.append('incluye_materiales', this.form.value.incluye_materiales ? 'true' : 'false');

    if (this.form.value.plato_principal) formData.append('plato_principal', this.form.value.plato_principal);

    // Fotos
    for (const file of this.selectedFiles) {
      formData.append('fotos', file);
    }

    this.tallerService.crear(formData).subscribe({
      next: () => {
        this.notificacion.mostrarExito('Taller creado exitosamente');
        this.router.navigate(['/talleres']);
      },
      error: (err) => {
        console.error(err);
        this.notificacion.mostrarError('Error al crear taller: Verifica los datos');
      }
    });
  }
}
