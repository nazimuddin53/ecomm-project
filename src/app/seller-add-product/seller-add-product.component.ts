import { Component, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { Router, RouterLink } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  addMessage = new EventEmitter();

  constructor(
    private product: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
  addProduct(data: Product) {
    if (data.category != '') {
      this.product.addProduct(data).subscribe((result) => {
        console.log(result);
        if (result) {
          this._snackBar.open('Add Product Successfull !', '', {
            duration: 4000,
          });

          this.router.navigate(['seller-home']);
        }
      });
    }
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }
}
