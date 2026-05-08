import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotasService } from './notas-service';
import { Nota } from './nota.model';

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

  constructor(private notasService: NotasService) {
    this.notas = this.notasService.obtenerNotas();
  }

guardarNota() {
    if (this.tituloNota.trim() === '' || this.contenidoNota.trim() === '') return;

    if (this.notaActualId !== null) {
      this.notasService.actualizarNota(this.notaActualId, this.tituloNota, this.contenidoNota);
    } else {
      const nuevaNota: Nota = {
        id: Date.now(),
        titulo: this.tituloNota,
        contenido: this.contenidoNota,
        fecha: new Date().toLocaleDateString()
      };
      this.notasService.agregarNota(nuevaNota);
    }

    this.limpiarFormulario();
  }

  editarNota(nota: Nota) {
    this.notaActualId = nota.id;
    this.tituloNota = nota.titulo;
    this.contenidoNota = nota.contenido;
  }

  eliminarNota(id: number) {
    this.notasService.eliminarNota(id);
  }

  limpiarFormulario() {
    this.notaActualId = null;
    this.tituloNota = '';
    this.contenidoNota = '';
  }
}
