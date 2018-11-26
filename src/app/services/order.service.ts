import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    serviceUrl = "http://localhost:9000/api/orders/"
    constructor(private http:HttpClient) {

    }

    getOrderFromJSON() {
        return this.http.get(this.serviceUrl);
    }

    getCartFromJSON(id) {
        alert('Service id '+id)
        console.log(this.http.get(this.serviceUrl + id));
        return this.http.get(this.serviceUrl + id);
    }
}