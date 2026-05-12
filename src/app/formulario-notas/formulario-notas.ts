import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotasService } from '../servicios/notas-service';
import { RecordatoriosService } from '../servicios/recordatorios.service';

@Component({
  selector: 'app-formulario-notas',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css'
})
export class FormularioNotasComponent implements OnInit {
  notaId: number | null = null;
  titulo:    string = '';
  contenido: string = '';

  // Campos opcionales de recordatorio
  fechaRecordatorio: string = '';
  horaRecordatorio:  string = '';
  antelacion:        string = '60';

  constructor(
    private route:               ActivatedRoute,
    private router:              Router,
    private notasService:        NotasService,
    private recordatoriosService: RecordatoriosService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.notaId = Number(id);
      const nota = this.notasService.obtenerNotaPorId(this.notaId);

      if (nota) {
        this.titulo             = nota.titulo;
        this.contenido          = nota.contenido;
        this.fechaRecordatorio  = nota.fechaRecordatorio ?? '';
        this.horaRecordatorio   = nota.horaRecordatorio  ?? '';
        this.antelacion         = nota.antelacion        ?? '60';
      }
    }
  }

  guardar() {
    if (this.titulo.trim() === '' || this.contenido.trim() === '') {
      alert('Por favor, rellena el título y el contenido.');
      return;
    }

    const notaData = {
      titulo:             this.titulo.trim(),
      contenido:          this.contenido.trim(),
      fechaRecordatorio:  this.fechaRecordatorio  || undefined,
      horaRecordatorio:   this.horaRecordatorio   || undefined,
      antelacion:         this.antelacion          || undefined,
    };

    if (this.notaId !== null) {
      this.notasService.actualizarNota(this.notaId, notaData.titulo, notaData.contenido);

      // Actualizar o eliminar recordatorio existente
      if (notaData.fechaRecordatorio && notaData.horaRecordatorio) {
        this.recordatoriosService.agregarDesdeNota(
          this.notaId,
          notaData.titulo,
          notaData.contenido,
          notaData.fechaRecordatorio,
          notaData.horaRecordatorio,
          this.antelacion
        );
      } else {
        // Si borró la fecha, eliminar el recordatorio
        this.recordatoriosService.eliminarPorNotaId(this.notaId);
      }

    } else {
      const id = Date.now();
      this.notasService.agregarNota({
        id,
        titulo:    notaData.titulo,
        contenido: notaData.contenido,
        fecha:     new Date().toLocaleDateString(),
        fechaRecordatorio: notaData.fechaRecordatorio,
        horaRecordatorio:  notaData.horaRecordatorio,
        antelacion:        notaData.antelacion,
      });

      // Crear recordatorio si se indicó fecha y hora
      if (notaData.fechaRecordatorio && notaData.horaRecordatorio) {
        this.recordatoriosService.agregarDesdeNota(
          id,
          notaData.titulo,
          notaData.contenido,
          notaData.fechaRecordatorio,
          notaData.horaRecordatorio,
          this.antelacion
        );
      }
    }

    this.router.navigate(['/lista']);
  }
}