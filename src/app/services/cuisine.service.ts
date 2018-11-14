import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {
  serviceUrl:string="http://localhost:3000/cuisine/"
  constructor(private http: HttpClient) { }

  getCuisine() {
    return this.http.get(this.serviceUrl);
  }
  deleteCuisine(cus) {
    return this.http.delete(this.serviceUrl+cus.id);
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

  getCuisineById(id) {
    return this.http.get(this.serviceUrl +id);
  }
  updateCuisineById(id, newObject) {
    return this.http.put(this.serviceUrl +id, newObject);
  }
}
