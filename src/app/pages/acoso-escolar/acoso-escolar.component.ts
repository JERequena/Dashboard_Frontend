import { Component, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { ChartCard } from '../../components/chart-card/chart-card.component';
import { DashboardFilters, FiltroDashboard } from '../../components/dashboard-filters/dashboard-filters.component';

import { GlobalFiltersService } from '../../services/global-filters.service';

@Component({
  selector: 'app-acoso-escolar',
  imports: [
    ChartCard,
    DashboardFilters
  ],
  templateUrl: './acoso-escolar.component.html',
  styleUrl: './acoso-escolar.component.scss',
})
export class AcosoEscolar {

  readonly globalFilters = inject(GlobalFiltersService);

  filtros: FiltroDashboard[] = [
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
        'Bullying',
        'Cyberbullying'
      ],
      datasets: [
        {
          label: 'Casos',
          data: [
            23547,
            1676
          ],
          backgroundColor: [
            '#7200a8',
            '#c77ee8'
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
          label: 'Bullying',
          data: [
            120,
            420,
            750,
            980,
            1200,
            1350,
            2700,
            950,
            1000,
            3400,
            5200,
            4500,
            4600,
            2200
          ],
          borderColor: '#7200a8',
          backgroundColor: '#7200a8',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: false
        },
        {
          label: 'Cyberbullying',
          data: [
            40,
            120,
            180,
            210,
            230,
            250,
            350,
            180,
            200,
            550,
            700,
            800,
            650,
            160
          ],
          borderColor: '#c77ee8',
          backgroundColor: '#c77ee8',
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