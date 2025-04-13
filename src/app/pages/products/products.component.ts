import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule importálása
import { RouterLink, RouterOutlet } from '@angular/router';
import { Product } from '../../shared/models/product'; // Product interfész importálása

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], // CommonModule hozzáadása az imports tömbhöz
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 299999, stock: 10 },
    { id: 2, name: 'Okostelefon', price: 99999, stock: 25 },
    { id: 3, name: 'Fülhallgató', price: 19999, stock: 50 }
  ];
}