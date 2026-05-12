import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { NotasService } from '../servicios/notas-service';

@Component({
  selector: 'app-formulario-notas',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-notas.html',
  styleUrl: './formulario-notas.css'
})
export class FormularioNotasComponent implements OnInit {
  notaId: number | null = null;
  
  formularioNota = new FormGroup({
    titulo: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20)
    ]),
    contenido: new FormControl('', [
      Validators.required, 
      Validators.minLength(15), 
      Validators.maxLength(400)
    ])
  });

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
        this.formularioNota.patchValue({
          titulo: nota.titulo,
          contenido: nota.contenido
        });
      }
    }
  }

guardar() {
    if (this.formularioNota.invalid) return;

    const tituloValido = (this.formularioNota.value.titulo ?? '').trim();
    const contenidoValido = (this.formularioNota.value.contenido ?? '').trim();

    if (this.notaId !== null) {
      this.notasService.actualizarNota(this.notaId, tituloValido, contenidoValido);
    } else {
      this.notasService.agregarNota({
        id: Date.now(),
        titulo: tituloValido,
        contenido: contenidoValido,
        fecha: new Date().toISOString().split('T')[0]
      });
    }
    
    this.router.navigate(['/lista']);
  }
}
