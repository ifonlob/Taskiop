import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesNotas } from './detalles-notas';

describe('DetallesNotas', () => {
  let component: DetallesNotas;
  let fixture: ComponentFixture<DetallesNotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesNotas],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesNotas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
