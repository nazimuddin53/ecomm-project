import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  signUpError: undefined | string;
  isSignIn = true;
  signInError: undefined | string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.reloadUser();
  }

  signUp(user: SignUp) {
    if (user.name != '' && user.email != '' && user.password != '') {
      this.userService.checkEmail(user.email).subscribe((result) => {
        if (result) {
          console.log(result);

          this.userService.userSignUp(user);
        } else {
          this.signUpError = 'email all ready exist! ';
        }
      });
    }
  }
  signIn(user: SignIn) {
    if ((user.email != '', user.password != '')) {
      // console.log(user);
      this.userService.userSignIn(user);
      this.userService.isUserSignInError.subscribe((result) => {
        if (result) {
          this.signInError = 'Email or Password is Invalid';
        }
      });
    } else {
      this.signInError = 'email or password Invlid!';
    }
  }

  openSingUp() {
    this.isSignIn = !this.isSignIn;
  }
  openSignIn() {
    this.isSignIn = !this.isSignIn;
  }
}
