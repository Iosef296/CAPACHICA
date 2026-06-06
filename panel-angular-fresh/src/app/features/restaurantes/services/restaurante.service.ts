// src/app/features/restaurantes/services/restaurante.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Restaurante } from '../../../models/restaurante.model';

@Injectable({ providedIn: 'root' })
export class RestauranteService {
  private apiUrl = environment.apiUrl + '/restaurantes';

  constructor(private http: HttpClient) {}

  /**
   * Listar restaurantes con filtros y paginación
   */
  listar(filtros?: any): Observable<{ total: number; data: Restaurante[]; limit: number; offset: number }> {
    let params = new HttpParams();
    // ✅ Agregar timestamp para evitar caché
    params = params.set('_t', Date.now().toString());

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        const value = filtros[key];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value);
        }
      });
    }
    return this.http.get<{ total: number; data: Restaurante[]; limit: number; offset: number }>(this.apiUrl, { params });
  }

  /** Obtener un restaurante por ID */
  obtenerPorId(id: string): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/${id}`);
  }

  /** Crear restaurante (multipart/form-data) */
  crear(datos: FormData): Observable<Restaurante> {
    return this.http.post<Restaurante>(this.apiUrl, datos);
  }

  /** Actualizar restaurante (multipart/form-data) */
  actualizar(id: string, datos: FormData): Observable<Restaurante> {
    return this.http.put<Restaurante>(`${this.apiUrl}/${id}`, datos);
  }

  /** Eliminar (baja lógica) */
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Aprobar (solo admin) */
  aprobar(id: string): Observable<Restaurante> {
    return this.http.post<Restaurante>(`${this.apiUrl}/${id}/aprobar`, {});
  }
}
