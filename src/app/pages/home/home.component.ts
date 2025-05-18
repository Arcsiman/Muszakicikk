
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    CommonModule, 
    MatButtonModule,
    MatListModule, 
    MatIconModule, 
    RouterLinkActive], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
      console.log(' constructor');
    }

  ngOnInit(): void { 
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    this.authService.signOut().then(() => {
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      console.log('User logged out');
    });
  }
}

