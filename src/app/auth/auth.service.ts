import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../usuarios/usuario-crud/usuarios.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/usuarios/login';
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, clave: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, { email, clave }).pipe(
      tap(() => this.loggedIn$.next(true))
    );
  }

  logout() {
    this.loggedIn$.next(false);
  }
}
