import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartCard } from '../../components/chart-card/chart-card.component';

@Component({
  selector: 'app-prevalencia',
  standalone: true,
  imports: [ChartCard],
  templateUrl: './prevalencia.component.html',
  styleUrl: './prevalencia.component.scss',
})
export class Prevalencia {

  evolucionPrevalencia: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: [
        '2013', '2014', '2015', '2016', '2017', '2018', '2019',
        '2020', '2021', '2022', '2023', '2024', '2025', '2026'
      ],
      datasets: [
        {
          label: 'Prevalencia',
          data: [
            0.1, 0.4, 0.8, 1.1, 1.6, 2.1, 2.8,
            0.2, 1.4, 3.1, 3.0, 3.1, 3.2, 1.2
          ],
          borderColor: '#6f2dbd',
          backgroundColor: '#6f2dbd',
          pointBackgroundColor: '#6f2dbd',
          pointBorderColor: '#6f2dbd',
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2,
          tension: 0.15,
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
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#e7eef4'
          },
          ticks: {
            color: '#31566f',
            font: {
              size: 9
            }
          },
          border: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 5,
          grid: {
            color: '#e7eef4'
          },
          ticks: {
            stepSize: 1,
            color: '#31566f',
            font: {
              size: 9
            },
            callback: (value) => `${value}%`
          },
          border: {
            display: false
          }
        }
      }
    }
  };

  prevalenciaViolencia: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [
        'Física',
        'Psicológica',
        'Sexual'
      ],
      datasets: [
        {
          label: 'Prevalencia',
          data: [1.4, 1.2, 0.6],
          backgroundColor: [
            '#1688d8',
            '#0876bc',
            '#ff7a3d'
          ],
          borderRadius: 0,
          barThickness: 24
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
              const casos = [
                '52,559 casos',
                '44,698 casos',
                '21,127 casos'
              ];

              return `${context.parsed.x}% (${casos[context.dataIndex]})`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          suggestedMax: 1.6,
          display: false,
          grid: {
            display: false
          },
          border: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: '#31566f',
            font: {
              size: 10
            }
          },
          border: {
            display: false
          }
        }
      }
    }
  };

}