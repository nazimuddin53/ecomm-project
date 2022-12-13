import { Component, OnInit } from '@angular/core';
import { SellerAddProductComponent } from 'src/app/seller-add-product/seller-add-product.component';

@Component({
  selector: 'app-add-product-message',
  templateUrl: './add-product-message.component.html',
  styleUrls: ['./add-product-message.component.css']
})
export class AddProductMessageComponent implements OnInit {
  message:string|undefined = '';
  constructor() { 
    
  }

  ngOnInit(): void {

  }

}
