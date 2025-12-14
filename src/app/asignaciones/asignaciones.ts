import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AsignacionLaboratorioService, Asignacion, Usuario, Laboratorio } from './asignacion-laboratorio.service';
import { AsignacionCrudComponent } from './asignacion-crud/asignacion-crud';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './asignaciones.html',
  styleUrls: ['./asignaciones.scss']
})
export class Asignaciones implements OnInit {

  asignaciones: (Asignacion & { usuario: string; laboratorio: string })[] = [];
  usuarios: Usuario[] = [];
  laboratorios: Laboratorio[] = [];

  constructor(
    private service: AsignacionLaboratorioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarLaboratorios();
  }

  cargarUsuarios() {
    this.service.getUsuarios().subscribe({
      next: (u) => {
        this.usuarios = u;
        this.cargarAsignaciones();
      },
      error: (err) => console.error(err)
    });
  }

  cargarLaboratorios() {
    this.service.getLaboratorios().subscribe({
      next: (l) => {
        this.laboratorios = l;
        this.cargarAsignaciones();
      },
      error: (err) => console.error(err)
    });
  }

  cargarAsignaciones() {
    if (!this.usuarios.length || !this.laboratorios.length) return;

    this.service.listar().subscribe({
      next: (data) => {
        this.asignaciones = data.map(a => ({
          ...a,
          usuario: this.usuarios.find(u => u.id === a.idUsuario)?.nombre || 'N/A',
          laboratorio: this.laboratorios.find(l => l.id === a.idLaboratorio)?.nombre || 'N/A'
        }));
      },
      error: (err) => console.error(err)
    });
  }

abrirFormulario(asignacion?: Asignacion) {
  const dialogRef = this.dialog.open(AsignacionCrudComponent, {
    width: '400px',
    data: { asignacion: asignacion || null }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) this.cargarAsignaciones(); // refresca la lista si se guardó algo
  });
}


  editar(asignacion: Asignacion) {
    this.abrirFormulario(asignacion);
  }

  eliminar(id?: number) {
    if (id === undefined) return;
    if (!confirm('¿Está seguro de eliminar esta asignación?')) return;

    this.service.eliminar(id).subscribe({
      next: () => this.cargarAsignaciones(),
      error: (err) => console.error(err)
    });
  }
}
