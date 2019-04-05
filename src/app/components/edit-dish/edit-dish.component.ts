import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CuisineService } from 'src/app/services/cuisine.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {

  //Initialization of Object.
  dishObject: any = {
    _id:"",
    dishName: "",
    restaurantName: "",
    cost: "",
    type: "",
    description: "",
    poster: ""
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cuisineService: CuisineService) { }

  //Loads the Data to edit on '_id' from DB
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.cuisineService.getCuisineById(id).subscribe((res) => {
      this.dishObject = res;
    });
  }

  //Adds the Changes to the Database
  save() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.dishObject._id = id;
    this.cuisineService.updateCuisineById(id, this.dishObject).subscribe((res) => {
      this.router.navigate(['/cuisines/']);
    });
  }

  //Navigates back to the 'Cuisines' page
  cancel() {
    this.router.navigate(['/cuisines/']);
  }
}
