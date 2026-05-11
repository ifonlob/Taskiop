import { Routes } from '@angular/router';
import { ListaNotasComponent } from './lista-notas/lista-notas'; 
import { FormularioNotasComponent } from './formulario-notas/formulario-notas'; 

export const routes: Routes = [
  { path: '', redirectTo: 'notas', pathMatch: 'full' },
  { path: 'notas', component: ListaNotasComponent },
  { path: 'notas/nueva', component: FormularioNotasComponent },
  { path: 'notas/editar/:id', component: FormularioNotasComponent }
];