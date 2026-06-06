import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Plato } from '../../../models/plato.model';

@Injectable({ providedIn: 'root' })
export class PlatoService {
  private apiUrl = environment.apiUrl + '/platos';

  constructor(private http: HttpClient) {}

  /** Listar platos de un restaurante (sin paginación ni filtros) */
  listarPorRestaurante(restauranteId: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/restaurante/${restauranteId}`);
  }

  /** Obtener un plato por ID */
  obtenerPorId(id: string): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  /** Crear plato (multipart/form-data) */
  crear(datos: FormData): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, datos);
  }

  /** Actualizar plato (multipart/form-data) */
  actualizar(id: string, datos: FormData): Observable<Plato> {
    return this.http.put<Plato>(`${this.apiUrl}/${id}`, datos);
  }

  /** Eliminar plato */
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
