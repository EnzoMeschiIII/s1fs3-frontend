import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule],
  templateUrl: './asignaciones.html',
  styleUrls: ['./asignaciones.scss'],
})
export class Asignaciones {
  asignaciones = [
    { id: 1, usuario: 'Juan Pérez', laboratorio: 'Lab 101', fecha: new Date() },
    { id: 2, usuario: 'Ana López', laboratorio: 'Lab 202', fecha: new Date() }
  ];
}
