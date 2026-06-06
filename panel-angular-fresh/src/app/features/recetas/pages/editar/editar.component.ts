import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecetaService } from '../../services/receta.service';
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
    private recetaService: RecetaService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
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
    this.id = this.route.snapshot.params['id'];
    this.recetaService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue({
        titulo: data.titulo,
        descripcion: data.descripcion,
        ingredientes_detallados: data.ingredientes_detallados?.join(', ') || '',
        pasos: data.pasos?.join('; ') || '',
        tiempo_preparacion: data.tiempo_preparacion,
        dificultad: data.dificultad,
        pdf_url: data.pdf_url,
        video_url: data.video_url
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

    if (this.form.value.titulo) formData.append('titulo', this.form.value.titulo);
    if (this.form.value.descripcion) formData.append('descripcion', this.form.value.descripcion);
    if (this.form.value.tiempo_preparacion) formData.append('tiempo_preparacion', this.form.value.tiempo_preparacion);
    if (this.form.value.dificultad) formData.append('dificultad', this.form.value.dificultad);
    if (this.form.value.pdf_url) formData.append('pdf_url', this.form.value.pdf_url);
    if (this.form.value.video_url) formData.append('video_url', this.form.value.video_url);

    // Arrays
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

    this.recetaService.actualizar(this.id, formData).subscribe({
      next: () => {
        this.enviando = false;
        this.notificacion.mostrarExito('Receta actualizada');
        this.router.navigate(['/recetas']);
      },
      error: () => {
        this.enviando = false;
        this.notificacion.mostrarError('Error al actualizar receta');
      }
    });
  }
}
