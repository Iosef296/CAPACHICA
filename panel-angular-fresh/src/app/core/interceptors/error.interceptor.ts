// src/app/core/interceptors/error.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NotificacionService } from '../services/notificacion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notificacion: NotificacionService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si es 401 y no es petición de login o refresh, intentar refresh
        if (error.status === 401 &&
          !req.url.includes('/auth/login') &&
          !req.url.includes('/auth/refresh')) {
          return this.authService.refreshToken().pipe(
            switchMap((res: { accessToken: string }) => {
              localStorage.setItem('accessToken', res.accessToken);
              const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${res.accessToken}`)
              });
              return next.handle(cloned);
            }),
            catchError(refreshError => {
              // Si falla el refresh, cerrar sesión
              this.authService.logout();
              this.router.navigate(['/auth/login']);
              this.notificacion.mostrarError('Sesión expirada, inicia sesión nuevamente');
              return throwError(() => refreshError);
            })
          );
        }

        let mensaje = 'Ocurrió un error inesperado';
        if (error.error instanceof ErrorEvent) {
          mensaje = error.error.message;
        } else {
          switch (error.status) {
            case 401:
              mensaje = error.error?.mensaje || 'Credenciales incorrectas';
              break;
            case 403:
              mensaje = 'No tienes permisos para realizar esta acción';
              break;
            case 404:
              mensaje = 'El recurso solicitado no existe';
              break;
            default:
              mensaje = error.error?.mensaje || `Error ${error.status}: ${error.statusText}`;
          }
        }
        this.notificacion.mostrarError(mensaje);
        return throwError(() => error);
      })
    );
  }
}
