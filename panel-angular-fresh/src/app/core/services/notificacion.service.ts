import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarExito(mensaje: string): void {
    this.snackBar.open(mensaje, '✓', { duration: 3000, panelClass: ['snackbar-exito'] });
  }
  mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, '✗', { duration: 4000, panelClass: ['snackbar-error'] });
  }
  mostrarInfo(mensaje: string): void {
    this.snackBar.open(mensaje, 'ℹ', { duration: 3000, panelClass: ['snackbar-info'] });
  }
}
