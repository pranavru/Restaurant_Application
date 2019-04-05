import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../viewmodels/restaurant.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ManageRestaurantService {
  serviceUrl = "http://localhost:9000/api/restuarants/";
  constructor(private http: HttpClient) { }

  getRestaurants():Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.serviceUrl);
  }

  deleteRestaurant(res) {
    return this.http.delete(this.serviceUrl + res._id);
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

  getRestaurantById(id):Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.serviceUrl + id);
  }
  updateRestaurantById(id, newObject) {
    return this.http.put(this.serviceUrl + id, newObject);
  }
}
