import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Focalizacion } from './focalizacion.component';

describe('Focalizacion', () => {
  let component: Focalizacion;
  let fixture: ComponentFixture<Focalizacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Focalizacion],
    }).compileComponents();

    fixture = TestBed.createComponent(Focalizacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
