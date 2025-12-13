import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Usuarios } from './usuarios/usuarios';
import { UsuarioCrud } from './usuarios/usuario-crud/usuario-crud';
import { Laboratorios } from './laboratorios/laboratorios';
import { Asignaciones } from './asignaciones/asignaciones';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'usuarios', component: Usuarios },
  { path: 'usuarios/crud', component: UsuarioCrud },
  { path: 'usuarios/editar/:id', component: UsuarioCrud },
  { path: 'usuarios/crear', component: UsuarioCrud },
  { path: 'laboratorios', component: Laboratorios },
  { path: 'asignaciones', component: Asignaciones },
  { path: '**', redirectTo: 'login' }
];
