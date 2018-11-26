import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serviceUrl= "http://localhost:9000/api/userRegister/"
  constructor(private http:HttpClient) { }

  addUser(userName, usrPassword, userEmail, userContact) {
    let newUser = {
      username:userName,
      password: usrPassword,
      email:userEmail,
      contact: userContact
    }
    return this.http.post(this.serviceUrl, newUser);
  }
}
