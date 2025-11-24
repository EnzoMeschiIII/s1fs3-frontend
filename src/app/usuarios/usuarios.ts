import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.scss'],
})
export class Usuarios {
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'usuario' },
    { id: 2, nombre: 'Ana López', email: 'ana@example.com', rol: 'usuario' },
    { id: 3, nombre: 'Carlos Díaz', email: 'carlos@example.com', rol: 'admin' }
  ];
}
