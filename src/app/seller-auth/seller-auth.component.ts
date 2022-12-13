import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  isSignIn = false;
  signInError = '';
  signUpError = '';

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signup(data: SignUp) {
    if (data.name != '' && data.email != '' && data.password != '') {
    
        // console.log(" in sign up")
        this.seller.sellerSignUp(data);
        this.seller.isSignUpError.subscribe((error) => {
        this.signUpError = error;
        });
    } else {
      this.signUpError = 'please give input ';
    }
  }
  signIn(data: SignIn) {
    console.log(data);

    if (data.email != '' && data.password != '') {
      this.seller.sellerSingIn(data);      
      this.seller.isSignInError.subscribe((error) => {
        this.signInError = ' '+error;
      });
    } else {
      this.signInError = "email or password is invalid !"
    }
  }
  openSignIn() {
    this.isSignIn = !this.isSignIn;
  }
  openSingUp() {
    this.isSignIn = !this.isSignIn;
  }
}
