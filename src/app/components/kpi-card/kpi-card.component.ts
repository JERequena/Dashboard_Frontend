import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
})
export class KpiCard {
  titulo = input.required<string>();
  valor = input.required<string>();
  subtitulo = input<string>('');
  icono = input<string>('fa-chart-line');
}