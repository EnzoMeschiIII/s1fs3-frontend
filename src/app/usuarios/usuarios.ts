import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from './usuario-crud/usuarios.service';
import { Usuario } from './usuario-crud/usuarios.model';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.scss']
})
export class Usuarios {

  usuarios: Usuario[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.cargarUsuarios();
  }

    ngOnInit(): void {
    this.cargarUsuarios(); 
  }

  cargarUsuarios() {
    this.usuariosService.listar().subscribe({
      next: (data: Usuario[]) => this.usuarios = data,
      error: (err: any) => console.error(err)
    });
  }

  irACrear() {
    this.router.navigate(['/usuarios/crear']);
  }

  editar(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  eliminar(id: number) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    this.usuariosService.eliminar(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err: any) => console.error(err)
    });
  }
}
