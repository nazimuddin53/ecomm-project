import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SellerAddProductComponent } from '../seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from '../seller-update-product/seller-update-product.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
productList:undefined | Product[];
  
  constructor(public dialog: MatDialog,private product:ProductService,private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:number){
    this.product.deleteProducts(id).subscribe(() => {
      this.list();
      this.snackBar.open('Delete Successfull', '',{duration: 3000});

    })
  }

  list(){
    this.product.productList().subscribe((result) => {
      this.productList = result
    });
  }

  updateProduct(id:number){
    this.router.navigateByUrl("seller-update-product/"+id)
  }
}
