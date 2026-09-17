import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header.component';
import { Navigation } from './layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Navigation
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {}