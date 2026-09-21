import { Component, HostListener, input } from '@angular/core';

export interface FiltroDashboard {
  id: string;
  label: string;
  opciones: string[];
}

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-filters.component.html',
  styleUrl: './dashboard-filters.component.scss'
})
export class DashboardFilters {
  filtros = input<FiltroDashboard[]>([]);

  filtroAbierto: string | null = null;

  alternarFiltro(filtro: string, event: Event): void {
    event.stopPropagation();
    this.filtroAbierto =
      this.filtroAbierto === filtro ? null : filtro;
  }

  @HostListener('document:click')
  cerrarFiltros(): void {
    this.filtroAbierto = null;
  }
}