import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Violencia } from './violencia.component';

describe('Violencia', () => {
  let component: Violencia;
  let fixture: ComponentFixture<Violencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Violencia],
    }).compileComponents();

    fixture = TestBed.createComponent(Violencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
