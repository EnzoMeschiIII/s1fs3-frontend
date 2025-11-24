import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-laboratorios',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './laboratorios.html',
  styleUrls: ['./laboratorios.scss'],
})
export class Laboratorios {
  laboratorios = [
    { id: 1, nombre: 'Lab 101', ubicacion: 'Piso 1' },
    { id: 2, nombre: 'Lab 202', ubicacion: 'Piso 2' },
    { id: 3, nombre: 'Lab 303', ubicacion: 'Piso 3' },
  ];
}
