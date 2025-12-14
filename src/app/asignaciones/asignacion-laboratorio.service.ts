import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asignacion {
  id?: number;
  idUsuario: number;
  idLaboratorio: number;
  fechaAsignacion?: string;
}

export interface Usuario {
  id?: number;
  nombre: string;
}

export interface Laboratorio {
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class AsignacionLaboratorioService {

  private apiUrl = 'http://localhost:8082/api/asignacionLaboratorios';
  private apiUsuarios = 'http://localhost:8081/api/usuarios';
  private apiLaboratorios = 'http://localhost:8082/api/laboratorios';

  constructor(private http: HttpClient) { }

  // CRUD asignaciones
  listar(): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(this.apiUrl);
  }

  crear(asignacion: Asignacion): Observable<Asignacion> {
    return this.http.post<Asignacion>(this.apiUrl, asignacion);
  }

  actualizar(id: number, asignacion: Asignacion): Observable<Asignacion> {
    return this.http.put<Asignacion>(`${this.apiUrl}/${id}`, asignacion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Traer usuarios y laboratorios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUsuarios);
  }

  getLaboratorios(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.apiLaboratorios);
  }
}
