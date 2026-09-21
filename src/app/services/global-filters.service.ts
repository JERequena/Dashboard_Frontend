import { Injectable, signal } from '@angular/core';
import type { CampoFiltroGlobal } from '../components/global-filters/global-filters.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalFiltersService {
  readonly abierto = signal(false);
  readonly cerrando = signal(false);

  readonly campos = signal<readonly CampoFiltroGlobal[] | undefined>(undefined);

  abrir(campos?: readonly CampoFiltroGlobal[]): void {
    this.campos.set(campos);
    this.cerrando.set(false);
    this.abierto.set(true);
  }

  cerrar(): void {
    if (!this.abierto() || this.cerrando()) {
      return;
    }

    this.cerrando.set(true);

    setTimeout(() => {
      this.abierto.set(false);
      this.cerrando.set(false);
    }, 300);
  }

  alternar(): void {
    if (this.abierto()) {
      this.cerrar();
    } else {
      this.abrir();
    }
  }
}