import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-crud.html'
})
export class UsuarioCrud implements OnInit {

  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      rol: ['usuario', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.obtenerPorId(this.id).subscribe(usuario => {
        this.form.patchValue(usuario);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const usuario: Usuario = this.form.value;

    if (this.id) {
      this.service.actualizar(this.id, usuario).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    } else {
      this.service.crear(usuario).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }
}
