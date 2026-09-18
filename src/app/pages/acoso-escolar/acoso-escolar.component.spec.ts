import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcosoEscolar } from './acoso-escolar.component';

describe('AcosoEscolar', () => {
  let component: AcosoEscolar;
  let fixture: ComponentFixture<AcosoEscolar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcosoEscolar],
    }).compileComponents();

    fixture = TestBed.createComponent(AcosoEscolar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
