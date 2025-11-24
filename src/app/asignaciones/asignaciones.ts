import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './asignaciones.html',
  styleUrls: ['./asignaciones.scss'],
})
export class Asignaciones {
  asignaciones = [
    { id: 1, usuario: 'Juan Pérez', laboratorio: 'Lab 101', fecha: new Date() },
    { id: 2, usuario: 'Ana López', laboratorio: 'Lab 202', fecha: new Date() },
    { id: 3, usuario: 'Carlos Díaz', laboratorio: 'Lab 303', fecha: new Date() },
  ];
}
