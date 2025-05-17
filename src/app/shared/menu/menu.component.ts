//import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule, 
    MatIconModule, 
    RouterLink, 
    RouterLinkActive 
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit , AfterViewInit, OnDestroy{
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {
    console.log('MenuComponent constructor');
  }

  ngOnInit(): void {
    console.log('MenuComponent ngOnInit');
  }
  ngAfterViewInit(): void {
    console.log('MenuComponent ngAfterViewInit');
  }
  ngOnDestroy(): void {
    console.log('MenuComponent ngOnDestroy');
  }

  closeMenu() {
    if(this.sidenav) {
      this.sidenav.close();
    }
  }
  logout() {
    this.authService.signOut().then(() => {
      this.logoutEvent.emit();
      this.closeMenu();
    });
  }
}