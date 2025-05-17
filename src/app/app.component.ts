import { Component, OnDestroy } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent, 
    RouterOutlet,
    CommonModule,
    RouterOutlet, 
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ], 
 template: `
    <app-menu [isLoggedIn]="isLoggedIn"></app-menu>
    <router-outlet></router-outlet>
  `,
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit , OnDestroy{
  title = 'Muszakicikk'; 
  isLoggedIn = false;
  private authSubscription?: Subscription;
  constructor(private authService: AuthService ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  logout():void{
    this.authService.signOut();
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

}