import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignacionLaboratorioService, Asignacion, Usuario, Laboratorio } from '../asignacion-laboratorio.service';

@Component({
  standalone: true,
  selector: 'app-asignacion-crud',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './asignacion-crud.html',
  styleUrls: ['./asignacion-crud.scss']
})
export class AsignacionCrudComponent implements OnInit {

  form!: FormGroup;
  usuarios: Usuario[] = [];
  laboratorios: Laboratorio[] = [];
  esEdicion = false;
  asignacionId?: number;

  constructor(
    private fb: FormBuilder,
    private service: AsignacionLaboratorioService,
    private dialogRef: MatDialogRef<AsignacionCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asignacion?: Asignacion }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idUsuario: [null, Validators.required],
      idLaboratorio: [null, Validators.required],
      fechaAsignacion: [new Date(), Validators.required]
    });

    this.cargarUsuarios();
    this.cargarLaboratorios();

    if (this.data?.asignacion) {
      this.esEdicion = true;
      this.asignacionId = this.data.asignacion.id;
      this.form.patchValue(this.data.asignacion);
    }
  }

  cargarUsuarios() {
    this.service.getUsuarios().subscribe({
      next: (u: Usuario[]) => this.usuarios = u,
      error: (err: any) => console.error(err)
    });
  }

  cargarLaboratorios() {
    this.service.getLaboratorios().subscribe({
      next: (l: Laboratorio[]) => this.laboratorios = l,
      error: (err: any) => console.error(err)
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const asignacion: Asignacion = this.form.value;

    if (this.esEdicion && this.asignacionId) {
      this.service.actualizar(this.asignacionId, asignacion).subscribe(() => {
        this.dialogRef.close(true); // <-- cerrar diálogo y notificar actualización
      });
    } else {
      this.service.crear(asignacion).subscribe(() => {
        this.dialogRef.close(true); // <-- cerrar diálogo
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false); // <-- cerrar diálogo
  }
}
