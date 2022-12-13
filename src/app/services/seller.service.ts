import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignIn, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SellerService {
  isSellerSignIn = new BehaviorSubject<boolean>(false);
  isSignInError = new EventEmitter(false);
  isSignUpError = new EventEmitter(false);
  emailCheckResult = false;
  userType = "defult";
  constructor(private http:HttpClient, private router:Router) { }

  emailCheck(data:SignUp){

    this.http.get(`http://127.0.0.1:3000/seller?email=${data.email}`).subscribe((result:any) => {
      if(result.body.email != ""){
        this.emailCheckResult = true;
      } else{
        this.emailCheckResult = false;
      }
    })
  }
  sellerSignUp(data:SignUp){
    // const d = JSON.stringify(data);
    return this.http.post("http://127.0.0.1:3000/seller",data,{ observe:"response" }).subscribe((result)=>{
      if(result){
        this.isSellerSignIn.next(true);
        localStorage.setItem("seller",JSON.stringify(result.body));
        this.router.navigate(['/seller-home'])
        
      } else {
        this.isSignUpError.emit(true);
      }
    });
    // console.log(d);
  }
  reloadSeller(){
    if(localStorage.getItem("seller")){
      this.isSellerSignIn.next(true);
      this.router.navigate(["/seller-home"])
    }
  }
  sellerSingIn(data:SignIn){
    return this.http.get(`http://127.0.0.1:3000/seller?email=${data.email}&password=${data.password}`,{ observe: "response"}).subscribe((result:any)=>{
      console.log("result",result.body);
      if(result && result.body && result.body.length){
        localStorage.setItem("seller",JSON.stringify(result.body));
        this.router.navigate(['/seller-home'])

      } else {
        this.isSignInError.emit(true);
      }
    });
  }
}
