import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  sameCetagoryProduct: undefined | Product[];
  productQuantity: number = 1;
  constructor(
    private activatedRouter: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activatedRouter.snapshot.paramMap.get('productId');

    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        if (this.productData) {
          this.product
            .searchProducts(this.productData.category)
            .subscribe((result) => {
              this.sameCetagoryProduct = result;
            });
        }
      });
  }
  handelQuantity(text: string) {
    if (text === 'plas' && this.productQuantity < 20) {
      this.productQuantity += 1;
    } else if (text === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }
  AddToCard() {
    if (this.productData) {
      this.productData.puantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.addToCart(this.productData);
      } else {
        this.product.addToCart(this.productData);
      }
    }
  }
}
