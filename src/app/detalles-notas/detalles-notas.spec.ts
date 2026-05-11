import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotaComponent } from './detalles-notas';

describe('DetalleNotaComponent', () => {
  let component: DetalleNotaComponent;
  let fixture: ComponentFixture<DetalleNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleNotaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleNotaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
