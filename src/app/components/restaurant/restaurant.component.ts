import { Component, OnInit } from '@angular/core';
import { ManageRestaurantService } from 'src/app/services/manage-restaurant.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from 'src/app/viewmodels/restaurant.viewmodel';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private manageRestaurantService: ManageRestaurantService, private router: Router, private http: HttpClient) { }
  restaurant: Restaurant[] = [];

  ngOnInit() {
    this.getRestaurantFromService();
  }
  getRestaurantFromService() {
    this.manageRestaurantService.getRestaurants().subscribe((res) => {
      this.restaurant = res;
    });
  }

  deleteRestaurantFromService(res) {
    this.manageRestaurantService.deleteRestaurant(res).subscribe((res) => {
      this.getRestaurantFromService();
    });
  }

  addRestaurantFromService(resName, resAddr, resConNo, resType) {

    this.manageRestaurantService.addRestaurant(resName, resAddr, resConNo, resType).subscribe(() => {
      this.getRestaurantFromService();
    });
  }

  goToEditRestaurant(res) {
    this.router.navigate(['/editRes/' + res]);
  }
}
