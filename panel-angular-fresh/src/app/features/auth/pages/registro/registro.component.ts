// src/app/features/auth/pages/registro/registro.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { NotificacionService } from '@core/services/notificacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  registroForm: FormGroup;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificacion: NotificacionService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telefono: [''],
      rol: ['turista']
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) return;

    this.cargando = true;
    this.authService.registro(this.registroForm.value).subscribe({
      next: () => {
        this.cargando = false;
        this.notificacion.mostrarExito('Registro exitoso. Inicia sesión');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.cargando = false;
        // El interceptor ya muestra el error
      }
    });
  }
}
