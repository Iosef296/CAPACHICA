import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TallerService } from '../../services/taller.service';
import { NotificacionService } from '@core/services/notificacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {
  form: FormGroup;
  cargando = true;
  id!: string;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private tallerService: TallerService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
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
    this.id = this.route.snapshot.params['id'];
    this.tallerService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        duracion: data.duracion,
        precio: data.precio,
        capacidad_maxima: data.capacidad_maxima,
        horarios: data.horarios?.join(', ') || '',
        incluye_materiales: data.incluye_materiales,
        plato_principal: data.plato_principal
      });
      this.cargando = false;
    });
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files) as File[];
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formData = new FormData();
    const campos = ['nombre', 'descripcion', 'duracion', 'precio', 'capacidad_maxima', 'plato_principal'];
    campos.forEach(campo => {
      const valor = this.form.value[campo];
      if (valor !== null && valor !== undefined && valor !== '') {
        formData.append(campo, String(valor));
      }
    });

    // Horarios como array JSON
    const horarios = this.form.value.horarios
      ? this.form.value.horarios.split(',').map((s: string) => s.trim())
      : [];
    formData.append('horarios', JSON.stringify(horarios));

    formData.append('incluye_materiales', String(this.form.value.incluye_materiales));

    // Nuevas fotos
    for (const file of this.selectedFiles) {
      formData.append('fotos', file);
    }

    this.tallerService.actualizar(this.id, formData).subscribe({
      next: () => {
        this.notificacion.mostrarExito('Taller actualizado');
        this.router.navigate(['/talleres']);
      },
      error: () => this.notificacion.mostrarError('Error al actualizar taller')
    });
  }
}
