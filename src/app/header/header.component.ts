import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  userName: string = '';
  searchValue: undefined | string;
  searchResult: undefined | Product[];
  cardItems = 0;
  constructor(
    private router: Router,
    private product: ProductService,
    private snackbar: MatSnackBar
  ) {}

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
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          if (localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore)[0];
            this.userName = userData.name;
          }
        } else {
          this.menuType = 'defult';
        }
      }
    });
    let cardData = localStorage.getItem('localCard');
    if (cardData) {
      this.cardItems = JSON.parse(cardData).length;
    }
    this.product.cartData.subscribe((item) => {
      this.cardItems = item.length;
    });
  }
  logout(out: string) {
    localStorage.removeItem(out);
    this.router.navigateByUrl('');
  }
  userLogout() {
    localStorage.removeItem('user');
    this.snackbar.open('User Log Out Successfull !!', '', { duration: 4000 });

    this.router.navigate(['user-auth']);
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
  ancor(text: string) {
    console.log(text);
  }
  redirectToDetails(result: Product) {
    this.searchValue = result.name;
    this.router.navigate([`/details/${result.id}`]);
  }
}
