import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-user',
  imports: [FormsModule],
  templateUrl: './registro-user.html',
  styleUrl: './registro-user.css'
})
export class RegistroUser {

  nombre: string = '';
  email: string = '';
  password: string = '';
  mensaje: string = '';

  registrarUsuario() {
    if (this.nombre === '' || this.email === '' || this.password === '') {
      this.mensaje = 'rellena todos los campos';
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    let existe = usuarios.find((u: any) => u.email === this.email);

    if (existe) {
      this.mensaje = 'ese email ya está registrado';
      return;
    }

    let nuevoId = 1;

    if (usuarios.length > 0) {
      nuevoId = usuarios[usuarios.length - 1].id + 1;
    }

    const usuarioNuevo = {
      id: nuevoId,
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    usuarios.push(usuarioNuevo);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.mensaje = 'usuario registrado correctamente';

    this.nombre = '';
    this.email = '';
    this.password = '';
  }
}