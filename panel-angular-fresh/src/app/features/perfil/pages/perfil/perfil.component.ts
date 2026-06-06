import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@core/services/usuario.service';
import { NotificacionService } from '@core/services/notificacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  cargando = true;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private notificacion: NotificacionService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      telefono: [''],
      rol: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(data => {
      this.form.patchValue(data);
      this.cargando = false;

      // ✅ Deshabilitar los controles en lugar de usar 'disabled' en el template
      this.form.get('email')?.disable();
      this.form.get('rol')?.disable();
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.usuarioService.actualizarPerfil(this.form.value).subscribe({
        next: () => this.notificacion.mostrarExito('Perfil actualizado'),
        error: () => this.notificacion.mostrarError('Error al actualizar perfil')
      });
    }
  }
}
