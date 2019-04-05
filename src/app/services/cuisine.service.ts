import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuisine } from '../viewmodels/cuisine.viewmodel';
import { Restaurant } from '../viewmodels/restaurant.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {
  serviceUrl: string = "http://localhost:9000/api/cuisines/";
  serviceUrl1: string = 'http://localhost:9000/api/restaurants/';
  constructor(private http: HttpClient) { }

  getRestaurant():Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.serviceUrl1);
  }

  getCuisine():Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(this.serviceUrl);
  }

  getCuisineById(id):Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(this.serviceUrl + id);
  }

  deleteCuisine(cus) {
    return this.http.delete(this.serviceUrl + cus._id);
  }

  addCuisine(cuiname, resname, cost, type, desc, poster) {
    let newCuisine = {
      dishName: cuiname,
      restaurantName: resname,
      cost: cost,
      type: type,
      description: desc,
      poster: poster
    }
    return this.http.post(this.serviceUrl, newCuisine);
  }

  updateCuisineById(id, newObject) {
    return this.http.put(this.serviceUrl + id, newObject);
  }
}
