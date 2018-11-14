import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/authentication/auth.service';

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
  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    this.getCuisineFromService();
  }

  getCuisineFromService() {
    this.cartService.getDish().subscribe((res) => {
      this.cart = res;
      this.getTotal();
    });
  }

  getTotal() {
    let i;
    this.total = 0;
    for (i = 0; i < this.cart.length; i++) {
      this.total += Number(this.cart[i].cost);
    }
  }

  addCartToOrder() {
    let OrderObject = {
      orderId: this.orderID,
      cart: this.cart,
      total: this.total,
      date: Date()
    };

    this.cartService.addToOrder(OrderObject).subscribe((res) => {
      alert('Order Placed Successfully');
    })
  }
}

