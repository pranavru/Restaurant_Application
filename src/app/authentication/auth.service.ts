import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signInUser(loginInfo: any) {
    if (loginInfo.userName == 'abc' && loginInfo.password == 'abc') {
      let successObject = {
        success: true,
        token: Math.floor((Math.random() *10000))
      }
      return successObject;
    } else {
      let failureObject = {
        success: false,
        token: null
      };
      return failureObject;
    }
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  loggedOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  constructor(private router: Router) { }
}
