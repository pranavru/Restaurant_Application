import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../viewmodels/order.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    serviceUrl = "http://localhost:9000/api/orders/"
    constructor(private http:HttpClient) {

    }

    getOrderFromJSON():Observable<Order[]> {
        return this.http.get<Order[]>(this.serviceUrl);
    }

    getCartFromJSON(id):Observable<Order[]> {
        return this.http.get<Order[]>(this.serviceUrl + id);
    }

    editCartFromJson(id, objectcart) {
        return this.http.put(this.serviceUrl + id, objectcart)
    }
    
    deleteCartItems(id) {
        return this.http.delete(this.serviceUrl + id);
    }
}