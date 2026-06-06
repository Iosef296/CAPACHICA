// src/app/features/auth/pages/login/login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { NotificacionService } from '@core/services/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificacion: NotificacionService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.cargando = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.cargando = false;
        this.notificacion.mostrarExito('Bienvenido al panel');
        // Redirigir al dashboard (o a restaurantes según rol)
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.cargando = false;
        // El interceptor ya muestra el mensaje de error
      }
    });
  }
}
