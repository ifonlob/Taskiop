import { Injectable } from '@angular/core';

export interface RecordatorioItem {
  id: string;
  notaId: number;        // referencia a la nota original
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  antelacion: string;
  activo: boolean;
  expirado: boolean;
  timerId?: ReturnType<typeof setTimeout>;
}

@Injectable({
  providedIn: 'root',
})
export class RecordatoriosService {

  private recordatorios: RecordatorioItem[] = [];

  constructor() {
    this.cargarDeStorage();
  }

  // ── Obtener todos ──────────────────────────
  obtenerRecordatorios(): RecordatorioItem[] {
    return this.recordatorios;
  }

  // ── Añadir desde una nota ──────────────────
  agregarDesdeNota(
    notaId: number,
    titulo: string,
    descripcion: string,
    fecha: string,
    hora: string,
    antelacion: string
  ): void {
    // Evitar duplicados: si ya existe un recordatorio para esa nota, lo reemplaza
    this.eliminarPorNotaId(notaId);

    const nuevo: RecordatorioItem = {
      id:          crypto.randomUUID(),
      notaId,
      titulo,
      descripcion,
      fecha,
      hora,
      antelacion,
      activo:      true,
      expirado:    false,
    };

    this.programarNotificacion(nuevo);
    this.recordatorios.push(nuevo);
    this.persistir();
  }

  // ── Eliminar por id de recordatorio ────────
  eliminar(id: string): void {
    const rec = this.recordatorios.find(r => r.id === id);
    if (rec?.timerId) clearTimeout(rec.timerId);
    this.recordatorios = this.recordatorios.filter(r => r.id !== id);
    this.persistir();
  }

  // ── Eliminar por id de nota ─────────────────
  eliminarPorNotaId(notaId: number): void {
    const rec = this.recordatorios.find(r => r.notaId === notaId);
    if (rec?.timerId) clearTimeout(rec.timerId);
    this.recordatorios = this.recordatorios.filter(r => r.notaId !== notaId);
    this.persistir();
  }

  // ── Programar notificación nativa ──────────
  programarNotificacion(rec: RecordatorioItem): void {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const [anio, mes, dia] = rec.fecha.split('-').map(Number);
    const [hh, mm]         = rec.hora.split(':').map(Number);

    const fechaEvento  = new Date(anio, mes - 1, dia, hh, mm, 0);
    const antelacionMs = Number(rec.antelacion) * 60 * 1000;
    const fechaAviso   = new Date(fechaEvento.getTime() - antelacionMs);
    const delay        = fechaAviso.getTime() - Date.now();

    if (delay <= 0) {
      rec.expirado = true;
      return;
    }

    rec.timerId = setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification(`🔔 ${rec.titulo}`, {
          body: rec.descripcion || `Tu evento es a las ${rec.hora}.`,
          icon: 'Logo.png'
        });
      }
      rec.expirado = true;
      rec.activo   = false;
      this.persistir();
    }, delay);
  }

  // ── Persistencia ───────────────────────────
  private cargarDeStorage(): void {
    const guardados = localStorage.getItem('taskiop-recordatorios');
    if (guardados) {
      this.recordatorios = JSON.parse(guardados);
      // Reactivar timers pendientes
      this.recordatorios.forEach(rec => {
        if (!rec.expirado && rec.fecha && rec.hora) {
          this.programarNotificacion(rec);
        }
      });
    }
  }

  private persistir(): void {
    const datos = this.recordatorios.map(({ timerId, ...rest }) => rest);
    localStorage.setItem('taskiop-recordatorios', JSON.stringify(datos));
  }
}