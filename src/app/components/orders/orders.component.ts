import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any = [];
  ordersCart: any = [];

  constructor(private orderService: OrderService) { }

  get format() {
    return 'short';
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrderFromJSON().subscribe((res) => {
      this.orders = res;
    });
  }

  getOrdersCart(id) {
    alert(id)
    this.orderService.getCartFromJSON(id).subscribe((res) => {
      this.ordersCart = res;
      console.log(this.ordersCart);
    });
  }
}
