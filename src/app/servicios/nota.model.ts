export interface Nota {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  fechaRecordatorio?: string;  // YYYY-MM-DD
  horaRecordatorio?: string;   // HH:MM
  antelacion?: string;         //'60' | '1440'
}