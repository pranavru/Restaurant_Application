import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CuisineService } from 'src/app/services/cuisine.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {

  dishObject: any = {
    id: "",
    dishName: "",
    restaurantName: "",
    cost: "",
    type: "",
    description: "",
    poster: ""
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cuisineService: CuisineService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.cuisineService.getCuisineById(id).subscribe((res) => {
      console.log(res);
      this.dishObject = res;
    });
  }

  save() {
    this.cuisineService.updateCuisineById(this.dishObject.id, this.dishObject).subscribe((res) => {
      alert("Data Updated !");
      this.router.navigate(['/cuisines/']);
    });
  }
  cancel() {
    this.router.navigate(['/cuisines/']);
  }
}
