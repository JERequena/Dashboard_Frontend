import { Component, signal, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { ChartCard } from '../../components/chart-card/chart-card.component';
import { DashboardFilters, FiltroDashboard } from '../../components/dashboard-filters/dashboard-filters.component';

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

interface MapaDepartamento {
  nombre: string;
  casos: number;
  path: string;
}

@Component({
  selector: 'app-ranking',
  imports: [
    ChartCard,
    DashboardFilters
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class Ranking{

  readonly globalFilters = inject(GlobalFiltersService);
  readonly camposFiltros: readonly CampoFiltroGlobal[] = [
    'anio', 'region', 'provincia', 'distrito',
    'dre', 'ugel', 'modalidad', 'nivelEducativo',
  ];

  departamentos = signal<MapaDepartamento[]>([]);

  filtros: FiltroDashboard[] = [
    {
      id: 'violencia',
      label: 'Tipo de violencia',
      opciones: ['Física', 'Psicológica', 'Sexual']
    },
    {
      id: 'agresor',
      label: 'Tipo de agresor',
      opciones: ['Entre escolares', 'Personal IE a escolares']
    },
    {
      id: 'sexo',
      label: 'Sexo del agredido',
      opciones: ['Hombres', 'Mujeres']
    },
    {
      id: 'acoso',
      label: 'Acoso escolar',
      opciones: ['Bullying', 'Ciberbullying', 'Otros tipos']
    },
    {
      id: 'gestion',
      label: 'Gestión de la IE',
      opciones: ['Privado', 'Público']
    },
    {
      id: 'estado',
      label: 'Estado de atención',
      opciones: ['En proceso', 'Finalizada']
    }
  ];

  configuracionEvolucion: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: [
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
        '2026'
      ],
      datasets: [
        {
          label: 'Lima Metropolitana',
          data: [
            1800,
            4500,
            8500,
            11500,
            14000,
            18000,
            22000,
            12500,
            23000,
            31000,
            31500,
            35000,
            38500,
            25000
          ],
          borderColor: '#1688d8',
          backgroundColor: '#1688d8',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        },
        {
          label: 'La Libertad',
          data: [
            900,
            2200,
            3900,
            5200,
            6500,
            8200,
            10500,
            6500,
            11500,
            14500,
            15500,
            16500,
            17500,
            12000
          ],
          borderColor: '#8b3fb5',
          backgroundColor: '#8b3fb5',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        },
        {
          label: 'Piura',
          data: [
            700,
            1800,
            3000,
            3900,
            5000,
            6500,
            8000,
            5000,
            8500,
            11000,
            12000,
            12500,
            13500,
            9000
          ],
          borderColor: '#d276d8',
          backgroundColor: '#d276d8',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        },
        {
          label: 'Arequipa',
          data: [
            500,
            1100,
            1800,
            2400,
            3000,
            3800,
            4500,
            3000,
            5000,
            6500,
            7200,
            7800,
            8500,
            6000
          ],
          borderColor: '#f47a2a',
          backgroundColor: '#f47a2a',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        },
        {
          label: 'Cusco',
          data: [
            400,
            900,
            1400,
            1900,
            2400,
            2900,
            3500,
            2300,
            3900,
            5000,
            5600,
            6200,
            7000,
            4800
          ],
          borderColor: '#229b5b',
          backgroundColor: '#229b5b',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 300,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: ${Number(context.raw).toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => Number(value).toLocaleString()
          }
        }
      }
    }
  };

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
        'geo/peru_departamental_simple.geojson'
      );

      if (!respuesta.ok) {
        throw new Error(
          `No se pudo cargar el GeoJSON: ${respuesta.status}`
        );
      }

      const geoJson =
        await respuesta.json() as GeoJsonCollection;

      const bounds = this.obtenerBounds(geoJson);

      const departamentos = geoJson.features.map((feature) => {
        const nombre = this.obtenerNombre(feature);
        const casos = this.obtenerCasos(nombre);

        return {
          nombre,
          casos,
          path: this.crearPath(feature.geometry, bounds)
        };
      });

      this.departamentos.set(departamentos);

    } catch (error) {
      console.error(
        'Error cargando el mapa del Perú:',
        error
      );
    }
  }

  private obtenerNombre(feature: GeoJsonFeature): string {
    const properties = feature.properties;

    const nombre =
      properties['NOMBDEP'] ??
      properties['NOMBRE_DPT'] ??
      properties['NAME_1'] ??
      properties['name'] ??
      properties['NAME'];

    return this.normalizarTexto(String(nombre ?? 'Departamento'));
  }

  private obtenerCasos(nombre: string): number {
    const nombreNormalizado = this.normalizarTexto(nombre);

    if (nombreNormalizado === 'LIMA') {
      return this.casosPorDepartamento['LIMA'];
    }

    return this.casosPorDepartamento[nombreNormalizado] ?? 0;
  }

  private normalizarTexto(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .trim();
  }

  private obtenerBounds(geoJson: GeoJsonCollection) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const feature of geoJson.features) {
      const coordenadas = this.extraerCoordenadas(
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

    const recorrer = (valor: unknown): void => {

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
        valor.forEach(item => recorrer(item));
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

    const scale = Math.min(scaleX, scaleY);

    const project = (coordinate: number[]): string => {

      const x =
        padding +
        (coordinate[0] - bounds.minX) * scale;

      const y =
        height -
        padding -
        (coordinate[1] - bounds.minY) * scale;

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
          .map(coordenada => project(coordenada))
          .join(' L ') +
        ' Z'
      );
    };

    if (geometry.type === 'Polygon') {

      return (geometry.coordinates as number[][][])
        .map(anillo => construirAnillo(anillo))
        .join(' ');

    }

    return (geometry.coordinates as number[][][][])
      .map(poligono =>
        poligono
          .map(anillo => construirAnillo(anillo))
          .join(' ')
      )
      .join(' ');
  }

  obtenerClaseMapa(casos: number): string {

    if (casos >= 20000) {
      return 'level-5';
    }

    if (casos >= 10000) {
      return 'level-4';
    }

    if (casos >= 5000) {
      return 'level-3';
    }

    if (casos >= 1000) {
      return 'level-2';
    }

    return 'level-1';
  }

}