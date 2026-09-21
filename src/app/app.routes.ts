import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/panorama/panorama.component').then(
        (m) => m.Panorama
      ),
  },
  {
    path: 'violencia',
    loadComponent: () =>
      import('./pages/violencia/violencia.component').then(
        (m) => m.Violencia
      ),
  },
  {
    path: 'agresores',
    loadComponent: () =>
      import('./pages/agresores/agresores.component').then(
        (m) => m.Agresores
      ),
  },
  {
    path: 'acoso-escolar',
    loadComponent: () =>
      import('./pages/acoso-escolar/acoso-escolar.component').then(
        (m) => m.AcosoEscolar
      ),
  },
  {
    path: 'ranking',
    loadComponent: () =>
      import('./pages/ranking/ranking.component').then(
        (m) => m.Ranking
      ),
  },
  {
    path: 'focalizacion',
    loadComponent: () =>
      import('./pages/focalizacion/focalizacion.component').then(
        (m) => m.Focalizacion
      ),
  },
  {
    path: 'prevalencia',
    loadComponent: () =>
      import('./pages/prevalencia/prevalencia.component')
        .then(m => m.Prevalencia)
  }
];
