import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'defult';
  sellerName: string = '';
  searchResult: undefined | Product[];

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      // console.log("con",val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          this.menuType = 'defult';
        }
      }
    });
  }
  logout(out: string) {
    localStorage.removeItem(out);
    this.router.navigate(['']);
  }
  searchProduct(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    this.product.searchProducts(element.value).subscribe((result) => {
      this.searchResult = result;
      if (result.length > 6) {
        result.length = 6;
      }
    });
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  // SubmitSearch method defined
  submitSearch(value: string) {
    this.router.navigate([`search/${value}`]);
  }
}
