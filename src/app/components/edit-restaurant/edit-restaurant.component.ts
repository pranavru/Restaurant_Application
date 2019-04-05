import { Component, OnInit } from '@angular/core';
import { ManageRestaurantService } from 'src/app/services/manage-restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  restaurantObject: any = {
    id: "",
    dishName: "",
    restaurantName: "",
    cost: "",
    type: "",
    description: "",
    poster: ""
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private manageRestaurantCuisine: ManageRestaurantService) { }

  //Loads the Data in Form Fields
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.manageRestaurantCuisine.getRestaurantById(id).subscribe((res) => {
      this.restaurantObject = res;
    });
  }

  //Saves the Data to the server if or not updated.
  save() {
    this.manageRestaurantCuisine.updateRestaurantById(this.restaurantObject._id, this.restaurantObject).subscribe((res) => {
      this.router.navigate(['/restaurants/']);
    });
  }
  
  //Navigates back to 'Restaurants' page.
  cancel() {
    this.router.navigate(['/restaurants/']);
  }
}
