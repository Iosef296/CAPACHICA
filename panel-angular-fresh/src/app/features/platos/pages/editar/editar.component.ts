import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatoService } from '../../services/plato.service';
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
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private platoService: PlatoService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
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
    this.id = this.route.snapshot.params['id'];
    this.platoService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        ingredientes: data.ingredientes?.join(', ') || '',
        categoria: data.categoria,
        temporada: data.temporada,
        es_recomendado: data.es_recomendado
      });
      this.cargando = false;
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0] as File;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.enviando = true;

    const formData = new FormData();

    if (this.form.value.nombre) formData.append('nombre', this.form.value.nombre);
    if (this.form.value.descripcion) formData.append('descripcion', this.form.value.descripcion);
    if (this.form.value.precio) formData.append('precio', String(this.form.value.precio));
    if (this.form.value.categoria) formData.append('categoria', this.form.value.categoria);
    if (this.form.value.temporada) formData.append('temporada', this.form.value.temporada);

    formData.append('es_recomendado', String(this.form.value.es_recomendado));

    // Arrays
    const ingredientes = this.form.value.ingredientes
      ? this.form.value.ingredientes.split(',').map((s: string) => s.trim())
      : [];
    formData.append('ingredientes', JSON.stringify(ingredientes));

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.platoService.actualizar(this.id, formData).subscribe({
      next: () => {
        this.enviando = false;
        this.notificacion.mostrarExito('Plato actualizado');
        this.router.navigate(['/platos']);
      },
      error: () => {
        this.enviando = false;
        this.notificacion.mostrarError('Error al actualizar plato');
      }
    });
  }
}
