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

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.manageRestaurantCuisine.getRestaurantById(id).subscribe((res) => {
      console.log(res);
      this.restaurantObject = res;
    });
  }
  save() {
    this.manageRestaurantCuisine.updateRestaurantById(this.restaurantObject._id, this.restaurantObject).subscribe((res) => {
      alert("Data Updated !");
      this.router.navigate(['/restaurants/']);
    });
  }
  cancel() {
    this.router.navigate(['/restaurants/']);
  }
}
