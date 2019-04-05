import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../viewmodels/cart.viewmodel';
import { Cuisine } from '../viewmodels/cuisine.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  serviceUrl: "http://localhost:9000/api/cuisines/"
  serviceUrl1 = "http://localhost:9000/api/cart/"
  serviceUrl2 = "http://localhost:9000/api/orders/"
  cart: any = [];
  cartObj: any = {};
  constructor(private http: HttpClient) { }

  getDishFromJSON(dish):Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(this.serviceUrl + dish);
  }
  getDish():Observable<Cart[]> {
    return this.http.get<Cart[]>(this.serviceUrl1);
  }

  getDishById(id):Observable<Cart> {
    return this.http.get<Cart>(this.serviceUrl1 + id);
  }

  addCuisine(cuiname, resname, cost, type, qty) {
    let newDish = {
      dishName: cuiname,
      restaurantName: resname,
      cost: cost,
      type: type,
      qty: qty
    }
    return this.http.post(this.serviceUrl1, newDish);
  }


  addToCart(cuiname, resname, cost, type) {
    const qty = 1;
    this.addCuisine(cuiname, resname, cost, type, qty).subscribe((response) => {
      this.cart += response;
      alert('The Product is added');
    });
  }

  deleteFromCartOnOrder(id) {
    return this.http.delete(this.serviceUrl1 + id).subscribe(() => {
    })
  }

  addToOrder(OrderObject) {
    return this.http.post(this.serviceUrl2, OrderObject);
  }

  editOrder(id, cartArray) {
    return this.http.put(this.serviceUrl1 + id, cartArray);
  }
}
