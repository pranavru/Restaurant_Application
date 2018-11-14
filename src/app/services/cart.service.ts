import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  serviceUrl: "http://localhost:3000/cuisine/"
  serviceUrl1 = "http://localhost:3000/cart/"
  serviceUrl2 = "http://localhost:3000/orders/"
  cart: any = [];
  constructor(private http: HttpClient) { }

  getDishFromJSON(dish) {
    return this.http.get(this.serviceUrl + dish);
  }
  getDish() {
    return this.http.get(this.serviceUrl1);
  }
  
  addCuisine(cuiname, resname, cost, type) {
    let newDish = { 
      dishName: cuiname,
      restaurantName: resname,
      cost: cost,
      type: type
    }
    return this.http.post(this.serviceUrl1, newDish);
  }

  addToCart(cuiname, resname, cost, type) {
    this.addCuisine(cuiname, resname, cost, type).subscribe((response) => {
      this.cart += response;
      alert('The Product added with Id: '+response);
      return response;
    });
  }
  
  deleteFromCartOnOrder(id) {
    return this.http.delete(this.serviceUrl1+id)
  }

  addToOrder(OrderObject) {
    return this.http.post(this.serviceUrl2, OrderObject); //db
  }
}
