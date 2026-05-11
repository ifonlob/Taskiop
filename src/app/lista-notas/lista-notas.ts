import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotasService } from '../core/notas.service';
import { Nota } from '../core/nota.model';

@Component({
  selector: 'app-lista-notas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lista-notas.component.html'
})
export class ListaNotasComponent implements OnInit {
  notas: Nota[] = [];
  constructor(private notasService: NotasService) {}

  ngOnInit() { this.notas = this.notasService.obtenerNotas(); }

  eliminar(id: number) {
    this.notasService.eliminarNota(id);
    this.notas = this.notasService.obtenerNotas();
  }
}