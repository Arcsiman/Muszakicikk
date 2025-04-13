import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CartItem } from '../../shared/models/cartitem'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDividerModule, 
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  registeredUser = {
    email: 'Proba@gmail.com',
    firstname: 'Proba',
    lastname: 'Teszt',
    password: '********'
  };

  cartItems: CartItem[] = [
    { id: 1, productId: 101, productName: 'Laptop', quantity: 1 },
    { id: 2, productId: 102, productName: 'Okostelefon', quantity: 2 },
    { id: 3, productId: 103, productName: 'Fülhallgató', quantity: 3 }
  ];
}