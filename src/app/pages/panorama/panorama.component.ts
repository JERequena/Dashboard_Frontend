import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { KpiCard } from '../../components/kpi-card/kpi-card.component';
import { ChartCard } from '../../components/chart-card/chart-card.component';

@Component({
  selector: 'app-panorama',
  imports: [
    KpiCard,
    ChartCard
  ],
  templateUrl: './panorama.component.html',
  styleUrl: './panorama.component.scss',
})
export class Panorama {

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
          label: 'Casos reportados',

          data: [
            207,
            2028,
            3634,
            5287,
            5552,
            9379,
            13000,
            755,
            768,
            12025,
            19722,
            19297,
            19535,
            7195
          ],

          borderWidth: 2,
          tension: 0.3,

          pointRadius: 3,
          pointHoverRadius: 5,

          fill: false,
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          callbacks: {
            label: (context) => {
              return `Casos: ${context.formattedValue}`;
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

  configuracionTipoViolencia: ChartConfiguration<'doughnut'> = {

    type: 'doughnut',

    data: {
      labels: [
        'Física',
        'Psicológica',
        'Sexual'
      ],

      datasets: [
        {
          data: [
            52559,
            44698,
            21127
          ],

          borderWidth: 2
        }
      ]
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: 'bottom'
        },

        tooltip: {
          callbacks: {
            label: (context) => {

              const total = context.dataset.data
                .reduce(
                  (acumulado, valor) =>
                    acumulado + Number(valor),
                  0
                );

              const valor = Number(context.raw);

              const porcentaje = ((valor / total) * 100).toFixed(1);

              return `${context.label}: ${valor.toLocaleString()} (${porcentaje}%)`;
            }
          }
        }
      }
    }
  };

  configuracionTipoAgresor: ChartConfiguration<'bar'> = {

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

          borderWidth: 0
        }
      ]
    },

    options: {
      indexAxis: 'y',

      responsive: true,
      maintainAspectRatio: false,

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

  configuracionGestionIE: ChartConfiguration<'bar'> = {

    type: 'bar',

    data: {
      labels: [
        'Público',
        'Privado'
      ],

      datasets: [
        {
          label: 'Casos',
          data: [
            88856,
            29528
          ],

          borderWidth: 0
        }
      ]
    },

    options: {
      indexAxis: 'y',

      responsive: true,
      maintainAspectRatio: false,

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

  configuracionSexoAgredido: ChartConfiguration<'bar'> = {

    type: 'bar',

    data: {
      labels: [
        'Mujeres',
        'Hombres'
      ],

      datasets: [
        {
          label: 'Casos',
          data: [
            59427,
            58957
          ],

          borderWidth: 0
        }
      ]
    },

    options: {
      indexAxis: 'y',

      responsive: true,
      maintainAspectRatio: false,

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

  configuracionEstadoAtencion: ChartConfiguration<'bar'> = {

    type: 'bar',

    data: {
      labels: [
        'Finalizada',
        'En proceso'
      ],

      datasets: [
        {
          label: 'Casos',
          data: [
            108924,
            9460
          ],

          borderWidth: 0
        }
      ]
    },

    options: {
      indexAxis: 'y',

      responsive: true,
      maintainAspectRatio: false,

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
}