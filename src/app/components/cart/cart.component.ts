import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = [];
  orderID = Math.floor((Math.random() * 10000000000))
  date = new Date();
  total = 0;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService, private authService: AuthService) { }

  //Calls the Data on Component Load
  ngOnInit() {
    this.getCuisineFromService();
  }

  //Gets the Data from Component
  getCuisineFromService() {
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
    for(let i  =0; i < this.cart.length; i++) {
      this.cartService.deleteFromCartOnOrder(this.cart[i]._id);
    }
    this.getCuisineFromService();
  }

  //Adds the Data to the Cart
  addCartToOrder() {
    let OrderObject = {
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

  goToHome() {
    this.router.navigate(['/']);
  }
}

