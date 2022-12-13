import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  constructor(
    private router: ActivatedRoute,
    private product: ProductService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let productId = this.router.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        this.productData = data;
      });
  }
  updateProduct(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this._snackBar.open('Update Product Successfull !', '', {
          duration: 4000,
        });
        this.route.navigateByUrl('seller-home');
      }
    });
  }

  onNoClick() {}
}
