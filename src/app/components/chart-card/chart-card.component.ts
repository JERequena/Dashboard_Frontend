import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  input,
} from '@angular/core';

import {
  Chart,
  ChartConfiguration,
} from 'chart.js/auto';

@Component({
  selector: 'app-chart-card',
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCard implements AfterViewInit, OnDestroy {

  titulo = input.required<string>();

  configuracion = input.required<ChartConfiguration>();

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;
  private vistaInicializada = false;

  constructor() {
    effect(() => {
      const configuracion = this.configuracion();

      if (this.vistaInicializada) {
        this.renderizarGrafico(configuracion);
      }
    });
  }

  ngAfterViewInit(): void {
    this.vistaInicializada = true;

    this.renderizarGrafico(this.configuracion());
  }

  private renderizarGrafico(
    configuracion: ChartConfiguration
  ): void {

    this.chart?.destroy();

    this.chart = new Chart(
      this.chartCanvas.nativeElement,
      configuracion
    );
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}