import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.model';

@Component({
  standalone: true,
  selector: 'app-usuario-crud',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-crud.html'
})
export class UsuarioCrud implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      rol: ['usuario', Validators.required]
    });
  }

crear() {
  console.log('CLICK');
  console.log(this.form.value);

  if (this.form.invalid) {
    console.log('FORM INVALIDO');
    return;
  }

  const usuario = this.form.value;
  this.usuariosService.crear(usuario).subscribe({
    next: () => {
      alert('Usuario creado');
      this.form.reset({ rol: 'usuario' });
    },
    error: (err) => {
      console.error(err);
      alert('Error al crear usuario');
    }
    });
  }
}
