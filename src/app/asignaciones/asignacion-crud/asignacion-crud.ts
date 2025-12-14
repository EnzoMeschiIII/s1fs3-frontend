import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AsignacionLaboratorioService, Asignacion, Usuario, Laboratorio } from '../asignacion-laboratorio.service';

@Component({
  selector: 'app-asignacion-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './asignacion-crud.html',
  styleUrls: ['./asignacion-crud.scss']
})
export class AsignacionCrudComponent implements OnInit {
  form!: FormGroup;
  usuarios: Usuario[] = [];
  laboratorios: Laboratorio[] = [];
  asignacion?: Asignacion;

  constructor(
    private fb: FormBuilder,
    private service: AsignacionLaboratorioService,
    private dialogRef: MatDialogRef<AsignacionCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asignacion?: Asignacion }
  ) {}

  ngOnInit(): void {
    this.asignacion = this.data?.asignacion;

    this.form = this.fb.group({
      idUsuario: [this.asignacion?.idUsuario || '', Validators.required],
      idLaboratorio: [this.asignacion?.idLaboratorio || '', Validators.required],
      fechaAsignacion: [this.asignacion?.fechaAsignacion || '']
    });

    this.cargarUsuarios();
    this.cargarLaboratorios();
  }

  cargarUsuarios() {
    this.service.getUsuarios().subscribe({
      next: (u) => this.usuarios = u,
      error: (err) => console.error(err)
    });
  }

  cargarLaboratorios() {
    this.service.getLaboratorios().subscribe({
      next: (l) => this.laboratorios = l,
      error: (err) => console.error(err)
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const asignacionForm: Asignacion = this.asignacion
      ? { ...this.asignacion, ...this.form.value }
      : this.form.value;

    const request$ = this.asignacion
      ? this.service.actualizar(this.asignacion.id!, asignacionForm)
      : this.service.crear(asignacionForm);

    request$.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err)
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
