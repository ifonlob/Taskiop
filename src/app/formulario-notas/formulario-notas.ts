import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotasService } from '../servicios/notas-service';

@Component({
  selector: 'app-formulario-notas',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css'
})
export class FormularioNotasComponent implements OnInit {
  notaId: number | null = null;
  titulo: string = '';
  contenido: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private notasService: NotasService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.notaId = Number(id)
      const nota = this.notasService.obtenerNotaPorId(this.notaId);
      
      if (nota) {
        this.titulo = nota.titulo;
        this.contenido = nota.contenido;
      }
    }
  }

  guardar() {
    if (this.titulo.trim() === '' || this.contenido.trim() === '') {
      alert('Por favor, rellena el título y el contenido.');
      return; 
    }

    if (this.notaId !== null) {
      this.notasService.actualizarNota(this.notaId, this.titulo, this.contenido);
    } else {
      this.notasService.agregarNota({
        id: Date.now(),
        titulo: this.titulo,
        contenido: this.contenido,
        fecha: new Date().toISOString().split('T')[0]
      });
    }
    
    this.router.navigate(['/lista']);
  }
}