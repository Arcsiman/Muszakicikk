import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/menu/menu.component'; // Menü importálása

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}

/*
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // RouterLink importálása
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  changePage(): void {
    this.router.navigate(['/login']); // Navigálás a login oldalra
  }
}*/