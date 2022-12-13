import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];

  constructor(private products: ProductService) {}

  ngOnInit(): void {
    this.products.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });
    this.products.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }
}
