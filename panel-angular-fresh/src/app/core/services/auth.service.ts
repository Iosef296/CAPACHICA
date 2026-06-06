// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDTO } from '../../dtos/auth-login.dto';
import { RegistroDTO } from '../../dtos/auth-registro.dto';
import { Usuario } from '../../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuarioDesdeLocalStorage();
  }

  private cargarUsuarioDesdeLocalStorage(): void {
    const accessToken = localStorage.getItem('accessToken');
    const usuario = localStorage.getItem('usuario');
    if (accessToken && usuario) {
      this.currentUserSubject.next(JSON.parse(usuario));
    }
  }

  login(credenciales: LoginDTO): Observable<any> {
    return this.http.post<{ usuario: Usuario; accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/login`,
      credenciales
    ).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.currentUserSubject.next(res.usuario);
      })
    );
  }

  registro(datos: RegistroDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refresh = localStorage.getItem('refreshToken');
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/refresh`,
      { refreshToken: refresh }
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  tieneRol(rol: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.rol === rol : false;
  }
}
