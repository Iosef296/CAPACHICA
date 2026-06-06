import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Receta } from '../../../models/receta.model';

@Injectable({ providedIn: 'root' })
export class RecetaService {
  private apiUrl = environment.apiUrl + '/recetas';

  constructor(private http: HttpClient) {}

  /** Obtener receta de un plato */
  obtenerPorPlato(platoId: string): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/plato/${platoId}`);
  }

  /** Obtener receta por ID */
  obtenerPorId(id: string): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/${id}`);
  }

  /** Crear receta (multipart/form-data) */
  crear(datos: FormData): Observable<Receta> {
    return this.http.post<Receta>(this.apiUrl, datos);
  }

  /** Actualizar receta (multipart/form-data) */
  actualizar(id: string, datos: FormData): Observable<Receta> {
    return this.http.put<Receta>(`${this.apiUrl}/${id}`, datos);
  }

  /** Eliminar receta */
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Descargar PDF */
  descargarPdf(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }
}
