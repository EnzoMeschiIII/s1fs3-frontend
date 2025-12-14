import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.model';

@Component({
  standalone: true,
  selector: 'app-usuario-crud',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './usuario-crud.html',
  styleUrls: ['./usuario-crud.scss']
})
export class UsuarioCrud implements OnInit {

  form!: FormGroup;
  esEdicion = false;
  usuarioId?: number;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['usuario', Validators.required]
    });

    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.usuarioId) {
      this.esEdicion = true;
      this.cargarUsuario();
    }
  }

  cargarUsuario() {
    this.usuariosService.obtenerPorId(this.usuarioId!).subscribe(usuario => {
      this.form.patchValue(usuario);
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const usuario: Usuario = this.form.value;

    if (this.esEdicion && this.usuarioId) {
      this.usuariosService.actualizar(this.usuarioId, usuario).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    } else {
      this.usuariosService.crear(usuario).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}
