import { Routes } from '@angular/router';
import { ListaNotasComponent } from './lista-notas/lista-notas';
import { FormularioNotasComponent } from './formulario-notas/formulario-notas';
import { DetalleNotaComponent } from './detalles-notas/detalles-notas';
import { Recordatorio } from './recordatorio/recordatorio';

export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: ListaNotasComponent },
  { path: 'formulario', component: FormularioNotasComponent },
  { path: 'editar/:id', component: FormularioNotasComponent },
  { path: 'detalle/:id', component: DetalleNotaComponent } ,
  { path: 'recordatorios', component: Recordatorio }
];