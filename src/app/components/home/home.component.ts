import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import {Router} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dishes:any= [];
  constructor(private homeService : HomeService, private route: Router, private cartService: CartService) { }

  ngOnInit() {
    this.getCuisineFromService();
  }

  getCuisineFromService() {
    this.homeService.getCuisine().subscribe((res)=> {
      this.dishes = res;
    });
  }

  addToCartService(cuiname, resname, cost, type) {
    this.cartService.addToCart(cuiname, resname, cost, type);
  }
}
