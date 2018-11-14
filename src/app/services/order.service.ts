import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    serviceUrl = "http://localhost:3000/orders/"
    constructor(private http:HttpClient) {

    }

    getOrderFromJSON() {
        return this.http.get(this.serviceUrl);
    }

    getCartFromJSON(id) {
        alert('Service id '+id)
        return this.http.get(this.serviceUrl + id+ "/cart");
    }
}