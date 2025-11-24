import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  // Usuario simulado
  private usuario = { id: 3, nombre: 'adm', email: 'adm@adm.cl', rol: 'admin' };

  login(email: string) {
    if (email === this.usuario.email) {
      this._isLoggedIn.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.next(false);
  }

  // Nuevo getter para usar en templates sin async pipe
  isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  // Opcional: para obtener el usuario logueado
  getUsuario() {
    return this._isLoggedIn.getValue() ? this.usuario : null;
  }
}
