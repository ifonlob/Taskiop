import { Routes } from '@angular/router';
import { ListaNotasComponent } from './lista-notas/lista-notas';
import { FormularioNotasComponent } from './formulario-notas/formulario-notas';
import { DetalleNotaComponent } from './detalles-notas/detalles-notas';

export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: ListaNotasComponent },
  { path: 'formulario', component: FormularioNotasComponent },
  { path: 'editar/:id', component: FormularioNotasComponent },
  // 2. Añadimos la ruta para el detalle
  { path: 'detalle/:id', component: DetalleNotaComponent } 
];