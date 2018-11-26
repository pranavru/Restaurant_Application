import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  serviceUrl: "http://localhost:9000/api/cuisines/"
  serviceUrl1 = "http://localhost:9000/api/cart/"
  serviceUrl2 = "http://localhost:9000/api/orders/"
  cart: any = [];
  constructor(private http: HttpClient) { }

  getDishFromJSON(dish) {
    return this.http.get(this.serviceUrl + dish);
  }
  getDish() {
    return this.http.get(this.serviceUrl1);
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
      alert('The Product added with Id: ' + response);
    });
  }

  deleteFromCartOnOrder(id) {
    return this.http.delete(this.serviceUrl1 + id).subscribe(() => {
    })
  }

  addToOrder(OrderObject) {
    return this.http.post(this.serviceUrl2, OrderObject); //db
  }
}
