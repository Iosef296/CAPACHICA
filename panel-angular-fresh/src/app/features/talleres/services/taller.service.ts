// src/app/features/talleres/services/taller.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Taller } from '../../../models/taller.model';

@Injectable({ providedIn: 'root' })
export class TallerService {
  private apiUrl = environment.apiUrl + '/talleres';

  constructor(private http: HttpClient) {}

  /**
   * Listar talleres de un restaurante (con filtros y paginación)
   */
  listarPorRestaurante(
    restauranteId: string,
    filtros?: {
      precio_min?: number;
      precio_max?: number;
      duracion?: string;
      disponible?: boolean;
      limit?: number;
      offset?: number;
    }
  ): Observable<{ total: number; data: Taller[]; limit: number; offset: number }> {
    let params = new HttpParams();
    if (filtros) {
      Object.keys(filtros).forEach(key => {
        const value = filtros[key as keyof typeof filtros];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, String(value));
        }
      });
    }
    return this.http.get<{ total: number; data: Taller[]; limit: number; offset: number }>(
      `${this.apiUrl}/restaurante/${restauranteId}`,
      { params }
    );
  }

  /** Obtener un taller por ID */
  obtenerPorId(id: string): Observable<Taller> {
    return this.http.get<Taller>(`${this.apiUrl}/${id}`);
  }

  /** Crear taller (multipart/form-data) */
  crear(datos: FormData): Observable<Taller> {
    return this.http.post<Taller>(this.apiUrl, datos);
  }

  /** Actualizar taller (multipart/form-data) */
  actualizar(id: string, datos: FormData): Observable<Taller> {
    return this.http.put<Taller>(`${this.apiUrl}/${id}`, datos);
  }

  /** Eliminar taller */
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
