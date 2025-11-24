import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-laboratorios',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule],
  templateUrl: './laboratorios.html',
  styleUrls: ['./laboratorios.scss'],
})
export class Laboratorios {
  laboratorios = [
    { id: 1, nombre: 'Lab 101', capacidad: 20, ubicacion: 'Piso 1' },
    { id: 2, nombre: 'Lab 202', capacidad: 15, ubicacion: 'Piso 2' },
    { id: 3, nombre: 'Lab 303', capacidad: 25, ubicacion: 'Piso 3' }
  ];
}
