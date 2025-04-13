import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterOutlet], 
  template: `
    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'Muszakicikk'; 
}