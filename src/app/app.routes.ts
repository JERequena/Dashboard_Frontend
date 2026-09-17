import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/panorama/panorama.component').then(
        (m) => m.Panorama
      ),
  },
];
