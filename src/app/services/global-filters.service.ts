import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalFiltersService {
  readonly abierto = signal(false);
  readonly cerrando = signal(false);

  abrir(): void {
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