import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotasService } from '../servicios/notas-service';
import { Nota } from '../modelos/nota.model';

@Component({
  selector: 'app-detalle-nota',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalles-notas.html',
  styleUrl: './detalles-notas.css'
})
export class DetalleNotaComponent implements OnInit {
  nota: Nota | undefined;

  constructor(
    private route: ActivatedRoute,
    private notasService: NotasService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nota = this.notasService.obtenerNotaPorId(Number(id));
    }
  }
}