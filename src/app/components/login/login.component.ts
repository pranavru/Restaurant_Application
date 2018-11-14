import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObject ={
    userName:"",
    password:""
  };
  errorMessage: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  signIn() {
    let result:any= this.authService.signInUser(this.loginObject);
    console.log("Token: " + result.token);
    if(result.success == true) {
      localStorage.setItem('token', result.token);
      this.router.navigate(['/cart']);
    } else {
      this.errorMessage="Invalid Username or Password";
      this.router.navigate(['/login']);
    }
  }
}
