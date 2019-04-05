import { Component, OnInit } from '@angular/core';
import { CuisineService } from 'src/app/services/cuisine.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { ManageRestaurantService } from 'src/app/services/manage-restaurant.service';
import { Cuisine } from 'src/app/viewmodels/cuisine.viewmodel';
import { Restaurant } from 'src/app/viewmodels/restaurant.viewmodel';


@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.css']
})
export class CuisinesComponent implements OnInit {
  cuisines: Cuisine[] = [];
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: ManageRestaurantService, private cuisineService: CuisineService, private router: Router, private http: HttpClient, private cartService: CartService) { }
  ngOnInit() {
    this.getCuisineFromService();
    this.getRestaurantFromCuisineService();
  }

  //Loads the Restaurant from Online DB for adding Cuisine
  getRestaurantFromCuisineService() {
    this.restaurantService.getRestaurants().subscribe((res) => {
      this.restaurants = res;
    })
  }

  //Loads the Cuisines from the DB
  getCuisineFromService() {
    this.cuisineService.getCuisine().subscribe((res) => {
      this.cuisines = res;
    });
  }

  //Navigates to the Edit Component on 'Edit' Click
  goToEditCuisine(res) {
    this.router.navigate(['/edit/' + res]);
  }

  //Deletes the Cuisines from the Database
  deleteCuisineFromService(cuisine) {
    this.cuisineService.deleteCuisine(cuisine).subscribe(() => {
      this.getCuisineFromService();
    })
  }

  //Adds Cuisines to the Database on 'Add Cuisine' Call
  addCuisineFromService(cuiname, resname, cost, type, desc, poster) {
    this.cuisineService.addCuisine(cuiname, resname, cost, type, desc, poster).subscribe(() => {
      this.getCuisineFromService();
    })
  }
}
