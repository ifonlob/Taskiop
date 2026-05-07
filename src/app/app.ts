import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Nota {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  notas: Nota[] = [];
  notaActualId: number | null = null;
  tituloNota: string = '';
  contenidoNota: string = '';

  guardarNota() {
    if (this.tituloNota.trim() === '' || this.contenidoNota.trim() === '') return;

    if (this.notaActualId !== null) {
      const indice = this.notas.findIndex(nota => nota.id === this.notaActualId);
      if (indice !== -1) {
        this.notas[indice] = {
          ...this.notas[indice],
          titulo: this.tituloNota,
          contenido: this.contenidoNota
        };
      }
    } else {
      const nuevaNota: Nota = {
        id: Date.now(),
        titulo: this.tituloNota,
        contenido: this.contenidoNota,
        fecha: new Date().toLocaleDateString()
      };
      this.notas = [nuevaNota, ...this.notas];
    }

    this.limpiarFormulario();
  }

  editarNota(nota: Nota) {
    this.notaActualId = nota.id;
    this.tituloNota = nota.titulo;
    this.contenidoNota = nota.contenido;
  }

  eliminarNota(id: number) {
    this.notas = this.notas.filter(nota => nota.id !== id);
  }

  limpiarFormulario() {
    this.notaActualId = null;
    this.tituloNota = '';
    this.contenidoNota = '';
  }
}
