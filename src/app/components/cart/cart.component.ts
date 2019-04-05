import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

import { Router } from '@angular/router';
import { Cart } from 'src/app/viewmodels/cart.viewmodel';
import { AuthService } from 'src/app/authentication/auth.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[] = [];
  center_cor :any;
  orderID = Math.floor((Math.random() * 10000000000))
  date = new Date();
  total = 0;
  token = localStorage.getItem('token');
  editOrder = false;
  editCart = false;

  lat: number = 19.0760;
  lng: number = 72.8777;
  public searchControl: FormControl;
  public zoom_map: number = 5;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  //Calls the Data on Component Load
  ngOnInit() {
    this.getCuisineFromService();
  }

  private init_Map() {
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place = google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom_map = 12;

          //Autocomplete the input box 


        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom_map = 4;
      });
      this.center_cor = {
        lat: this.lat,
        lng: this.lng
      }
      // navigator.geolocation.watchPosition((position) => {
      //   this.lat = position.coords.latitude;
      //   this.lng = position.coords.longitude;
      //   this.zoom_map = 4;
      // })
    }
  }
  //Gets the Data from Component
  getCuisineFromService() {
    this.editOrder = false;
    this.editCart = false
    this.cartService.getDish().subscribe((res) => {
      this.cart = res;
      this.getTotal();
    });
  }

  //Generates the Total Amount of the Order Qty
  getTotal() {
    let i;
    this.total = 0;
    for (i = 0; i < this.cart.length; i++) {
      this.total += Number(this.cart[i].cost * this.cart[i].qty);
    }
  }

  //Deletes cart once Order Placed
  deleteCartOnOrder() {
    this.total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.cartService.deleteFromCartOnOrder(this.cart[i]._id);
    }
    this.getCuisineFromService();
  }

  //Adds the Data to the Cart
  addCartToOrder() {
    let OrderObject = {
      token: this.token,
      orderId: this.orderID,
      cart: this.cart,
      total: this.total,
      date: Date()
    };
    this.deleteCartOnOrder()
    this.cartService.addToOrder(OrderObject).subscribe((res) => {
      alert('Order Placed Successfully');
    })
  }

  /* Edit the quantitiy of the cart and updates the total before placig the order */

  edit() {
    this.editCart = true
  }

  cancel() {
    this.editCart = false
    this.editOrder = true
    this.getCuisineFromService()
  }

  editQty(id, qty) {
    if (qty <= 0) {
      alert("Enter Quantity >= 1")
    } else {
      for (let item of this.cart) {
        if (item._id === id) {
          item.qty = qty
          this.cartService.editOrder(item._id, item).subscribe(() => {
            this.editOrder = false;
            this.editCart = false
            this.getCuisineFromService();
          })
        }
      }
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}

