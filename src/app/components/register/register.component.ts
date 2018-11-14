import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  myForm:FormGroup;
  constructor(private user: UserService) {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$")]),
      contact: new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{9}$")])
    });
  }

  ngOnInit() {
  }
  onSignUp(myForm) {
    console.log(myForm.value);
  }
  addUserToService(username, password, email, contact) {
    this.user.addUser(username, password, email, contact).subscribe((res)=> {
        alert("Successfully Registered");
    });
  } 
}
