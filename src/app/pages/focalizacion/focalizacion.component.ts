import { Component, signal, inject } from '@angular/core';

import type { CampoFiltroGlobal } from '../../components/global-filters/global-filters.component';

import { GlobalFiltersService } from '../../services/global-filters.service';

interface GeoJsonGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

interface GeoJsonFeature {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: GeoJsonGeometry;
}

interface GeoJsonCollection {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}

interface ZonaMapa {
  nombre: string;
  casos: number;
  path: string;
}

@Component({
  selector: 'app-focalizacion',
  imports: [],
  templateUrl: './focalizacion.component.html',
  styleUrl: './focalizacion.component.scss',
})
export class Focalizacion {

  readonly globalFilters = inject(GlobalFiltersService);
  readonly camposFiltros: readonly CampoFiltroGlobal[] = [
      'anio', 'region', 'provincia', 'distrito',
      'dre', 'ugel', 'modalidad',
    ];

  zonas = signal<ZonaMapa[]>([]);

  private casosPorDepartamento: Record<string, number> = {
    'LIMA': 32540,
    'LA LIBERTAD': 12850,
    'PIURA': 9420,
    'AREQUIPA': 7850,
    'CUSCO': 6430,
    'CAJAMARCA': 5980,
    'JUNIN': 5760,
    'LAMBAYEQUE': 5210,
    'ANCASH': 4980,
    'PUNO': 4560,
    'ICA': 4200,
    'SAN MARTIN': 3980,
    'HUANUCO': 3650,
    'LORETO': 3420,
    'AYACUCHO': 3180,
    'APURIMAC': 2850,
    'UCAYALI': 2600,
    'TACNA': 2350,
    'HUANCAVELICA': 2180,
    'AMAZONAS': 1950,
    'MOQUEGUA': 1420,
    'PASCO': 1280,
    'TUMBES': 980,
    'MADRE DE DIOS': 650,
    'CALLAO': 520
  };

  constructor() {
    this.cargarMapa();
  }

  private async cargarMapa(): Promise<void> {
    try {
      const respuesta = await fetch(
        '/geo/peru_departamental_simple.geojson'
      );

      if (!respuesta.ok) {
        throw new Error(
          `No se pudo cargar el GeoJSON: ${respuesta.status}`
        );
      }

      const geoJson =
        await respuesta.json() as GeoJsonCollection;

      const bounds = this.obtenerBounds(geoJson);

      const zonas = geoJson.features.map(feature => {
        const nombre = this.obtenerNombre(feature);
        const casos = this.obtenerCasos(nombre);

        return {
          nombre,
          casos,
          path: this.crearPath(
            feature.geometry,
            bounds
          )
        };
      });

      this.zonas.set(zonas);

    } catch (error) {
      console.error(
        'Error cargando el mapa de focalización:',
        error
      );
    }
  }

  private obtenerNombre(
    feature: GeoJsonFeature
  ): string {

    const properties = feature.properties;

    const nombre =
      properties['NOMBDEP'] ??
      properties['NOMBRE_DPT'] ??
      properties['NAME_1'] ??
      properties['name'] ??
      properties['NAME'];

    return this.normalizarTexto(
      String(nombre ?? 'Departamento')
    );
  }

  private obtenerCasos(nombre: string): number {

    const nombreNormalizado =
      this.normalizarTexto(nombre);

    return (
      this.casosPorDepartamento[
        nombreNormalizado
      ] ?? 0
    );
  }

  private normalizarTexto(
    texto: string
  ): string {

    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .trim();
  }

  private obtenerBounds(
    geoJson: GeoJsonCollection
  ) {

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const feature of geoJson.features) {

      const coordenadas =
        this.extraerCoordenadas(
          feature.geometry
        );

      for (const [x, y] of coordenadas) {

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);

      }
    }

    return {
      minX,
      minY,
      maxX,
      maxY
    };
  }

  private extraerCoordenadas(
    geometry: GeoJsonGeometry
  ): number[][] {

    const resultado: number[][] = [];

    const recorrer = (
      valor: unknown
    ): void => {

      if (
        Array.isArray(valor) &&
        valor.length >= 2 &&
        typeof valor[0] === 'number' &&
        typeof valor[1] === 'number'
      ) {

        resultado.push([
          valor[0],
          valor[1]
        ]);

        return;
      }

      if (Array.isArray(valor)) {
        valor.forEach(item =>
          recorrer(item)
        );
      }
    };

    recorrer(geometry.coordinates);

    return resultado;
  }

  private crearPath(
    geometry: GeoJsonGeometry,
    bounds: {
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
    }
  ): string {

    const width = 520;
    const height = 500;
    const padding = 20;

    const scaleX =
      (width - padding * 2) /
      (bounds.maxX - bounds.minX);

    const scaleY =
      (height - padding * 2) /
      (bounds.maxY - bounds.minY);

    const scale = Math.min(
      scaleX,
      scaleY
    );

    const project = (
      coordinate: number[]
    ): string => {

      const x =
        padding +
        (coordinate[0] - bounds.minX) *
        scale;

      const y =
        height -
        padding -
        (coordinate[1] - bounds.minY) *
        scale;

      return `${x.toFixed(2)},${y.toFixed(2)}`;
    };

    const construirAnillo = (
      anillo: number[][]
    ): string => {

      if (!anillo.length) {
        return '';
      }

      return (
        'M ' +
        anillo
          .map(coordenada =>
            project(coordenada)
          )
          .join(' L ') +
        ' Z'
      );
    };

    if (geometry.type === 'Polygon') {

      return (
        geometry.coordinates as number[][][]
      )
        .map(anillo =>
          construirAnillo(anillo)
        )
        .join(' ');

    }

    return (
      geometry.coordinates as number[][][][]
    )
      .map(poligono =>
        poligono
          .map(anillo =>
            construirAnillo(anillo)
          )
          .join(' ')
      )
      .join(' ');
  }

  obtenerClaseMapa(
    casos: number
  ): string {

    if (casos >= 1000) {
      return 'level-5';
    }

    if (casos >= 501) {
      return 'level-4';
    }

    if (casos >= 101) {
      return 'level-3';
    }

    if (casos >= 11) {
      return 'level-2';
    }

    return 'level-1';
  }

}