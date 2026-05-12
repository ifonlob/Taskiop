import { TestBed } from '@angular/core/testing';
import { Recordatorio } from './recordatorio';

describe('Recordatorio', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recordatorio],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Recordatorio);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});