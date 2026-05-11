import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNotas } from './formulario-notas';

describe('FormularioNotas', () => {
  let component: FormularioNotas;
  let fixture: ComponentFixture<FormularioNotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioNotas],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioNotas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
