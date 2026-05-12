import { Component, OnInit } from '@angular/core';
import { RecordatoriosService, RecordatorioItem } from '../servicios/recordatorio.service';

@Component({
  selector: 'app-recordatorio',
  standalone: true,
  imports: [],
  templateUrl: './recordatorio.html',
  styleUrl: './recordatorio.css',
})
export class Recordatorio implements OnInit {

  recordatorios: RecordatorioItem[] = [];

  constructor(private recordatoriosService: RecordatoriosService) {}

  ngOnInit(): void {
    this.recordatorios = this.recordatoriosService.obtenerRecordatorios();
  }

  eliminar(id: string): void {
    this.recordatoriosService.eliminar(id);
  }
}