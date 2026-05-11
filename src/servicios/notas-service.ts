import { Injectable } from '@angular/core';
import { Nota } from './nota.model';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  notas: Nota[] = [];

  obtenerNotas() {
    return this.notas;
  }

  agregarNota(nuevaNota: Nota) {
    this.notas.push(nuevaNota);
  }

  actualizarNota(id: number, titulo: string, contenido: string) {
    const indice = this.notas.findIndex(nota => nota.id === id);
    if (indice !== -1) {
      this.notas[indice].titulo = titulo;
      this.notas[indice].contenido = contenido;
    }
  }

  eliminarNota(id: number) {
    const indice = this.notas.findIndex(nota => nota.id === id);
    if (indice !== -1) {
      this.notas.splice(indice, 1);
    }
  }
}
