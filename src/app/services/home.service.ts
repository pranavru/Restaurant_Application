import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  serviceUrl:string="http://localhost:9000/api/cuisines/"
  constructor(private http: HttpClient) { }

  getCuisine() {
    return this.http.get(this.serviceUrl);
  }
}
