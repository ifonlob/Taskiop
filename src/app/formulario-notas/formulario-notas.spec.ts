import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNotasComponent } from './formulario-notas';

describe('FormularioNotasComponent', () => {
  let component: FormularioNotasComponent;
  let fixture: ComponentFixture<FormularioNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioNotasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioNotasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
