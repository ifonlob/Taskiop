import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotasService } from '../servicios/notas-service';
import { Nota } from '../servicios/nota.model';

@Component({
  selector: 'app-lista-notas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista-notas.html',
  styleUrl: './lista-notas.css'
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