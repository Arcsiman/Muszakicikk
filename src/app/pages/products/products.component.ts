import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { Product } from '../../shared/models/product'; 
import { PricePipe } from '../../shared/pipes/price.pipe'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PricePipe, MatTooltipModule, MatIconModule, MatProgressBarModule], // CommonModule hozzáadása az imports tömbhöz
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  isLoading: boolean = true; 
  products: Product[] = [];

  categories: Category[] = [
    {
      id: 1,
      name: 'Elektronika',
      description: 'Műszaki cikkek, például laptopok, telefonok és egyéb elektronikai eszközök.'
    },
    {
      id: 2,
      name: 'Audio',
      description: 'Audio cuccok.'
    }
  ];
  constructor() {
    setTimeout(() => {
      this.products = [
        { id: 1, name: 'Laptop', price: 299999, stock: 10 , category: this.categories[0]},
        { id: 2, name: 'Okostelefon', price: 99999, stock: 25 ,category: this.categories[0]},
        { id: 3, name: 'Fülhallgató', price: 19999, stock: 50 ,category: this.categories[1]}
      ];
      this.isLoading = false; 
    }, 2000);
  }
}