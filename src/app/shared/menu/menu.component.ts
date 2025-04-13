import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatListModule, // MatNavList támogatása
    MatIconModule, // MatIcon támogatása
    RouterLink, // RouterLink támogatása
    RouterLinkActive // RouterLinkActive támogatása
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  closeMenu(): void {
    console.log('Menu closed');
    // Itt adhatsz hozzá logikát, például egy oldalsó menü bezárását
  }
}