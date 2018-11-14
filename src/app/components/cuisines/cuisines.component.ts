import { Component, OnInit } from '@angular/core';
import { CuisineService } from 'src/app/services/cuisine.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.css']
})
export class CuisinesComponent implements OnInit {
  restaurant: any = [];
  constructor(private cuisineService: CuisineService, private router: Router, private http: HttpClient, private cartService: CartService) { }
  serviceUrl
  ngOnInit() {
    this.getCuisineFromService()
  }

  getCuisineFromService() {
    this.cuisineService.getCuisine().subscribe((res) => {
      this.restaurant = res;
    });
  }

  goToEditCuisine(res) {
    alert(res);
    this.router.navigate(['/edit/' + res]);
  }

  deleteCuisineFromService(cuisine) {
    this.cuisineService.deleteCuisine(cuisine).subscribe((response) => {
      this.getCuisineFromService();
    })
  }

  addCuisineFromService(cuiname, resname, cost, type, desc, poster) {
    this.cuisineService.addCuisine(cuiname, resname, cost, type, desc, poster).subscribe((res) => {
      this.getCuisineFromService();
    })
  }
}
