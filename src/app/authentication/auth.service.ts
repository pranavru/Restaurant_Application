import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL to Login
  serviceUrl = "http://localhost:9000/api/userLogin/";

  //Function Called on Sign In
  signInUser(loginInfo: any) {
    return this.http.post(this.serviceUrl, loginInfo);
  }

  //Checks if Token is there or not if LoggedIn
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  //removes the Token if LoggedIn from local Storage and navigates to Home.
  loggedOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  constructor(private router: Router, private http: HttpClient) { }
}
