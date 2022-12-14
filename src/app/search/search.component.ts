import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | Product[];
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let query = this.activeRouter.snapshot.paramMap.get('query');
    query &&
      this.product.searchProducts(query).subscribe((result) => {
        this.searchResult = result;
      });
  }
}
