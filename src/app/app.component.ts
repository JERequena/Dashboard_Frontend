import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header.component';
import { Navigation } from './layout/navigation/navigation.component';
import { GlobalFilters } from './components/global-filters/global-filters.component';
import { GlobalFiltersService } from './services/global-filters.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Navigation,
    GlobalFilters
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  readonly globalFilters = inject(GlobalFiltersService);
}