import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageRestaurantService {
  serviceUrl= "http://localhost:3000/resaurants/"
  constructor(private http: HttpClient) { }

  getRestaurants() {
    return this.http.get(this.serviceUrl);
  }

  deleteRestaurant(res) {
    return this.http.delete(this.serviceUrl + res.id);
  }

  addRestaurant(resName, resAddr, resConNo, resType) {
    let newRestaurant = {
      name: resName,
      address: resAddr,
      contact: resConNo,
      type: resType
    }
    return this.http.post(this.serviceUrl, newRestaurant);
  }

  getRestaurantById(id) {
    return this.http.get(this.serviceUrl +id);
  }
  updateRestaurantById(id, newObject) {
    return this.http.put(this.serviceUrl +id, newObject);
  }
}
