import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Prevalencia } from './prevalencia.component';

describe('Prevalencia', () => {
  let component: Prevalencia;
  let fixture: ComponentFixture<Prevalencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prevalencia],
    }).compileComponents();

    fixture = TestBed.createComponent(Prevalencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});