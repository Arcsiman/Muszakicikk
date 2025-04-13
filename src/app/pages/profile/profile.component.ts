import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule, // MatCard támogatása
    MatIconModule, // MatIcon támogatása
    MatButtonModule, // MatButton támogatása
    MatDividerModule // MatDivider támogatása
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  registeredUser = {
    email: 'johndoe@example.com',
    firstname: 'John',
    lastname: 'Doe',
    password: '********'
  };
}