import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalFilters, crearFiltrosGlobalesVacios } from './global-filters.component';

describe('GlobalFilters', () => {
  let fixture: ComponentFixture<GlobalFilters>;
  let component: GlobalFilters;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GlobalFilters] }).compileComponents();
    fixture = TestBed.createComponent(GlobalFilters);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('opciones', {
      region: [{ valor: '15', etiqueta: 'Lima' }],
    });
    await fixture.whenStable();
  });

  it('renders all eleven fields and supplied options', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('select')).toHaveLength(8);
    expect(element.querySelectorAll('input')).toHaveLength(3);
    expect(element.querySelector('select[aria-label="Región"]')?.textContent).toContain('Lima');
  });

  it('clears dependent geography and emits the new selection', () => {
    component.valores.set({
      ...crearFiltrosGlobalesVacios(), anio: '2026', provincia: 'anterior',
      distrito: 'anterior', dre: 'anterior', ugel: 'anterior',
    });
    const emit = vi.spyOn(component.aplicar, 'emit');
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select[aria-label="Región"]');
    select.value = '15';
    select.dispatchEvent(new Event('change'));
    expect(emit).toHaveBeenCalledWith({
      ...crearFiltrosGlobalesVacios(), anio: '2026', region: '15',
    });
  });

  it('submits trimmed text and preserves leading zeros in codes', () => {
    const emit = vi.spyOn(component.aplicar, 'emit');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[aria-label="Código local"]');
    input.value = ' 001234 ';
    input.dispatchEvent(new Event('input'));
    expect(emit).not.toHaveBeenCalled();
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
    expect(emit).toHaveBeenCalledWith({ ...crearFiltrosGlobalesVacios(), codigoLocal: '001234' });
  });

  it('clears one search without clearing the others and resets all filters', () => {
    component.valores.set({ ...crearFiltrosGlobalesVacios(), codigoLocal: '001', codigoModular: '002' });
    fixture.nativeElement.querySelector('button[aria-label="Limpiar Código local"]').click();
    expect(component.valores().codigoLocal).toBe('');
    expect(component.valores().codigoModular).toBe('002');
    fixture.nativeElement.querySelector('.reset-button').click();
    expect(component.valores()).toEqual(crearFiltrosGlobalesVacios());
  });

  it('does not apply or mutate filters while disabled', async () => {
    fixture.componentRef.setInput('deshabilitado', true);
    await fixture.whenStable();
    const emit = vi.spyOn(component.aplicar, 'emit');
    component.actualizarSeleccion('anio', '2026');
    component.actualizarBusqueda('codigoLocal', '001');
    component.aplicarFiltros();
    expect(component.valores()).toEqual(crearFiltrosGlobalesVacios());
    expect(emit).not.toHaveBeenCalled();
  });
  it('renders configured fields in order without duplicates', async () => {
    fixture.componentRef.setInput('campos', ['codigoLocal', 'region', 'anio', 'region']);
    await fixture.whenStable();
    const controls: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('select, input');
    expect(Array.from(controls, control => control.getAttribute('aria-label')))
      .toEqual(['Código local', 'Región', 'Año']);
  });

  it('updates configuration without applying hidden values', async () => {
    component.valores.set({ ...crearFiltrosGlobalesVacios(), anio: '2026', region: '15' });
    fixture.componentRef.setInput('campos', ['anio']);
    await fixture.whenStable();
    const emit = vi.spyOn(component.aplicar, 'emit');
    component.aplicarFiltros();
    expect(emit).toHaveBeenLastCalledWith({ ...crearFiltrosGlobalesVacios(), anio: '2026' });
    expect(component.valores().region).toBe('15');
    fixture.componentRef.setInput('campos', ['region']);
    await fixture.whenStable();
    component.aplicarFiltros();
    expect(emit).toHaveBeenLastCalledWith({ ...crearFiltrosGlobalesVacios(), region: '15' });
    expect(fixture.nativeElement.querySelectorAll('select')).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('select').getAttribute('aria-label')).toBe('Región');
  });

  it('allows no fields and restores defaults when configuration is omitted', async () => {
    fixture.componentRef.setInput('campos', []);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('select, input')).toHaveLength(0);
    fixture.componentRef.setInput('campos', undefined);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('select, input')).toHaveLength(11);
  });
});
