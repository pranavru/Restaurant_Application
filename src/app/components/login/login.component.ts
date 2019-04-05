import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObject = {
    username: "",
    password: ""
  };
  result: any;
  errorMessage: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  //Sign in to the Data base and toekn generation
  signIn() {
    this.authService.signInUser(this.loginObject).subscribe((response) => {
      this.result = response;
      console.log("Token: " + this.result.token);
      if (this.result.success == true) {
        localStorage.setItem('token', this.result.token);
        this.router.navigate(['/cart']);
      } else {
        this.errorMessage = "Invalid Username or Password";
        this.router.navigate(['/login']);
      }
    });


  }
}
