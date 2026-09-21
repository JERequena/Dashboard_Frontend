import { Component, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { ChartCard } from '../../components/chart-card/chart-card.component';
import { DashboardFilters, FiltroDashboard } from '../../components/dashboard-filters/dashboard-filters.component';

import { GlobalFiltersService } from '../../services/global-filters.service';

@Component({
  selector: 'app-violencia',
  imports: [
    ChartCard,
    DashboardFilters
  ],
  templateUrl: './violencia.component.html',
  styleUrl: './violencia.component.scss',
})
export class Violencia {

  readonly globalFilters = inject(GlobalFiltersService);

  filtros: FiltroDashboard[] = [
    {
      id: 'agresor',
      label: 'Tipo de agresor',
      opciones: ['Entre escolares', 'Personal IE a escolares']
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

  configuracionDistribucion: ChartConfiguration<'bar'> = {
    type: 'bar',

    data: {
      labels: [
        'Física',
        'Psicológica',
        'Sexual'
      ],

      datasets: [
        {
          label: 'Casos',
          data: [
            52559,
            44698,
            21127
          ],

          borderWidth: 0
        }
      ]
    },

    options: {
      indexAxis: 'y',

      responsive: true,
      maintainAspectRatio: false,

      resizeDelay: 300,

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          callbacks: {
            label: (context) => {
              return `Casos: ${Number(context.raw).toLocaleString()}`;
            }
          }
        }
      },

      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  };


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
        '2026*'
      ],

      datasets: [
        {
          label: 'Física',

          data: [
            95,
            850,
            1450,
            2100,
            2350,
            3900,
            5200,
            310,
            420,
            4900,
            7800,
            8200,
            8500,
            3200
          ],

          borderWidth: 2,
          tension: 0.3,

          pointRadius: 3,
          pointHoverRadius: 5,

          fill: false
        },

        {
          label: 'Psicológica',

          data: [
            80,
            720,
            1280,
            1900,
            2050,
            3400,
            4700,
            280,
            300,
            4300,
            6900,
            7200,
            7600,
            2800
          ],

          borderWidth: 2,
          tension: 0.3,

          pointRadius: 3,
          pointHoverRadius: 5,

          fill: false
        },

        {
          label: 'Sexual',

          data: [
            32,
            458,
            904,
            1287,
            1152,
            2079,
            3100,
            165,
            48,
            2825,
            5022,
            3897,
            3435,
            1195
          ],

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
          position: 'bottom'
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
          beginAtZero: true
        }
      }
    }
  };

}