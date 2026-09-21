import { Component, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { ChartCard } from '../../components/chart-card/chart-card.component';
import { DashboardFilters, FiltroDashboard } from '../../components/dashboard-filters/dashboard-filters.component';

import { GlobalFiltersService } from '../../services/global-filters.service';

@Component({
  selector: 'app-agresores',
  imports: [
    ChartCard,
    DashboardFilters
  ],
  templateUrl: './agresores.component.html',
  styleUrl: './agresores.component.scss',
})
export class Agresores {
  
  readonly globalFilters = inject(GlobalFiltersService);

  filtros: FiltroDashboard[] = [
    {
      id: 'violencia',
      label: 'Tipo de violencia',
      opciones: ['Física', 'Psicológica', 'Sexual']
    },
    {
      id: 'sexo',
      label: 'Sexo del agredido',
      opciones: ['Hombres', 'Mujeres']
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
        'Entre escolares',
        'Personal IE a escolares'
      ],
      datasets: [
        {
          label: 'Casos',
          data: [
            70756,
            47628
          ],
          backgroundColor: [
            '#08a66a',
            '#8bcf9d'
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
          beginAtZero: true,
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
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
        '2026'
      ],
      datasets: [
        {
          label: 'Entre escolares',
          data: [
            125,
            1180,
            2140,
            3180,
            3300,
            5600,
            7800,
            430,
            450,
            7200,
            11800,
            11600,
            11850,
            4350
          ],
          borderColor: '#08a66a',
          backgroundColor: '#08a66a',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        },
        {
          label: 'Personal IE a escolares',
          data: [
            82,
            848,
            1494,
            2107,
            2252,
            3779,
            5200,
            325,
            318,
            4825,
            7922,
            7697,
            7685,
            2845
          ],
          borderColor: '#8bcf9d',
          backgroundColor: '#8bcf9d',
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
          beginAtZero: true
        }
      }
    }
  };

}