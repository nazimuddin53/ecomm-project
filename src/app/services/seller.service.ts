import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SellerService {

  isSellerSignIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }

  sellerSignUp(data:SignUp){
    const d = JSON.stringify(data);
    return this.http.post("http://127.0.0.1:3000/seller",data,{ observe:"response" }).subscribe((result)=>{
      if(result){
        this.isSellerSignIn.next(true);
        this.router.navigate(['/seller-home'])
        
      }
    });
    // console.log(d);
  }
  getSeller(){
    return this.http.get("http://127.0.0.1:3000/seller");
  }
}
