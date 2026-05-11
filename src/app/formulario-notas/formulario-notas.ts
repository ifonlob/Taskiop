import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotasService } from '../../servicios/notas-service';

@Component({
  selector: 'app-formulario-nota',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-nota.component.html'
})
export class FormularioNotaComponent implements OnInit {
  idNota: number | null = null;
  titulo: string = '';
  contenido: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idNota = +idParam;
      const nota = this.notasService.obtenerNotaPorId(this.idNota);
      if (nota) {
        this.titulo = nota.titulo;
        this.contenido = nota.contenido;
      }
    }
  }

  guardar() {
    if (this.idNota) {
      this.notasService.actualizarNota(this.idNota, this.titulo, this.contenido);
    } else {
      this.notasService.agregarNota({
        id: Date.now(),
        titulo: this.titulo,
        contenido: this.contenido,
        fecha: new Date().toLocaleDateString()
      });
    }
    this.router.navigate(['/notas']);
  }
}