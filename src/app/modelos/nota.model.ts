export interface Nota {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  fechaRecordatorio?: string;
  horaRecordatorio?: string;
  antelacion?: string;
}