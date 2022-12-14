import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { SignIn, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserSignIn = new BehaviorSubject<boolean>(false);
  isUserSignInError = new EventEmitter(false);
  isUserSignUpError = new EventEmitter(false);
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  checkEmail(email: string) {
    return this.http.get<SignUp>(`http://127.0.0.1:3000/users?email=${email}`);
  }

  userSignUp(data: SignUp) {
    return this.http
      .post('http://127.0.0.1:3000/users', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.isUserSignIn.next(true);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.snackbar.open('Sign Up Successfull !!', '', { duration: 4000 });
          this.router.navigate(['', '/']);
        } else {
          this.isUserSignUpError.emit(true);
        }
      });
  }
  reloadUser() {
    if (localStorage.getItem('user')) {
      this.isUserSignIn.next(true);
      this.router.navigate(['']);
    }
  }
  userSignIn(data: SignIn) {
    return this.http
      .get(
        `http://127.0.0.1:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length) {
          this.isUserSignIn.next(true);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.snackbar.open('Sign In Successfull !!', '', { duration: 4000 });
          this.router.navigate(['/']);
        } else {
          this.isUserSignInError.emit(true);
        }
      });
  }
}
