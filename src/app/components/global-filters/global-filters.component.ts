import { Component, computed, input, model, output } from '@angular/core';

export interface ValoresFiltrosGlobales {
  anio: string;
  region: string;
  provincia: string;
  distrito: string;
  dre: string;
  ugel: string;
  modalidad: string;
  nivelEducativo: string;
  codigoLocal: string;
  codigoModular: string;
  institucionEducativa: string;
}

export type CampoSeleccionGlobal = Exclude<
  keyof ValoresFiltrosGlobales,
  'codigoLocal' | 'codigoModular' | 'institucionEducativa'
>;
export type CampoBusquedaGlobal = Exclude<keyof ValoresFiltrosGlobales, CampoSeleccionGlobal>;

export type CampoFiltroGlobal = keyof ValoresFiltrosGlobales;

export interface OpcionFiltroGlobal {
  valor: string;
  etiqueta: string;
}

export type OpcionesFiltrosGlobales = Partial<
  Record<CampoSeleccionGlobal, readonly OpcionFiltroGlobal[]>
>;

export function crearFiltrosGlobalesVacios(): ValoresFiltrosGlobales {
  return {
    anio: '', region: '', provincia: '', distrito: '', dre: '', ugel: '',
    modalidad: '', nivelEducativo: '', codigoLocal: '', codigoModular: '',
    institucionEducativa: '',
  };
}

@Component({
  selector: 'app-global-filters',
  standalone: true,
  templateUrl: './global-filters.component.html',
  styleUrl: './global-filters.component.scss',
})
export class GlobalFilters {
  /** Campos visibles en orden. Sin configurar muestra todos; [] no muestra campos. */
  campos = input<readonly CampoFiltroGlobal[]>();
  /** Catálogos proporcionados por la página o un servicio compartido. */
  opciones = input<OpcionesFiltrosGlobales>({});
  deshabilitado = input(false);
  /** Admite enlace bidireccional [(valores)] al integrar el estado global. */
  valores = model<ValoresFiltrosGlobales>(crearFiltrosGlobalesVacios());
  aplicar = output<ValoresFiltrosGlobales>();
  cerrar = output<void>();

  readonly selecciones: readonly {
    campo: CampoSeleccionGlobal; etiqueta: string; nombre: string;
  }[] = [
    { campo: 'anio', etiqueta: 'AÑO', nombre: 'Año' },
    { campo: 'region', etiqueta: 'REGIÓN', nombre: 'Región' },
    { campo: 'provincia', etiqueta: 'PROVINCIA', nombre: 'Provincia' },
    { campo: 'distrito', etiqueta: 'DISTRITO', nombre: 'Distrito' },
    { campo: 'dre', etiqueta: 'DRE', nombre: 'Dirección Regional de Educación' },
    { campo: 'ugel', etiqueta: 'UGEL', nombre: 'Unidad de Gestión Educativa Local' },
    { campo: 'modalidad', etiqueta: 'MODALIDAD', nombre: 'Modalidad' },
    { campo: 'nivelEducativo', etiqueta: 'NIVEL EDUCATIVO', nombre: 'Nivel educativo' },
  ];

  readonly busquedas: readonly {
    campo: CampoBusquedaGlobal; etiqueta: string; nombre: string;
  }[] = [
    { campo: 'codigoLocal', etiqueta: 'CÓDIGO LOCAL', nombre: 'Código local' },
    { campo: 'codigoModular', etiqueta: 'CÓDIGO MODULAR', nombre: 'Código modular' },
    { campo: 'institucionEducativa', etiqueta: 'INSTITUCIÓN EDUCATIVA', nombre: 'Institución educativa' },
  ];

  readonly filtrosVisibles = computed(() => {
    const disponibles = [
      ...this.selecciones.map(filtro => ({ ...filtro, tipo: 'seleccion' as const })),
      ...this.busquedas.map(filtro => ({ ...filtro, tipo: 'busqueda' as const })),
    ];
    const campos = this.campos();
    if (campos === undefined) return disponibles;
    return [...new Set(campos)].flatMap(campo => {
      const filtro = disponibles.find(item => item.campo === campo);
      return filtro ? [filtro] : [];
    });
  });

  actualizarSeleccion(campo: CampoSeleccionGlobal, valor: string): void {
    if (this.deshabilitado()) return;
    const siguientes = { ...this.valores(), [campo]: valor };
    // Evita conservar selecciones dependientes de un ámbito anterior.
    if (campo === 'region') {
      siguientes.provincia = '';
      siguientes.distrito = '';
      siguientes.dre = '';
      siguientes.ugel = '';
    }
    if (campo === 'provincia') siguientes.distrito = '';
    if (campo === 'dre') siguientes.ugel = '';
    if (campo === 'modalidad') siguientes.nivelEducativo = '';
    this.valores.set(siguientes);
    this.aplicarFiltros();
  }

  actualizarBusqueda(campo: CampoBusquedaGlobal, valor: string): void {
    if (this.deshabilitado()) return;
    this.valores.update(actuales => ({ ...actuales, [campo]: valor }));
  }

  limpiarCampo(campo: CampoBusquedaGlobal): void {
    if (this.deshabilitado()) return;
    this.actualizarBusqueda(campo, '');
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    if (this.deshabilitado()) return;
    this.valores.set(crearFiltrosGlobalesVacios());
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    if (this.deshabilitado()) return;
    const valores = this.valores();
    const normalizados = {
      ...valores,
      codigoLocal: valores.codigoLocal.trim(),
      codigoModular: valores.codigoModular.trim(),
      institucionEducativa: valores.institucionEducativa.trim(),
    };
    this.valores.set(normalizados);
    // Conserva el modelo compartido; los campos ocultos se emiten vacíos.
    const activos = crearFiltrosGlobalesVacios();
    for (const filtro of this.filtrosVisibles()) {
      activos[filtro.campo] = normalizados[filtro.campo];
    }
    this.aplicar.emit(activos);
  }
}
