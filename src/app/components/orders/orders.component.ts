import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/viewmodels/order.viewmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  ordersCart: any = {};
  editOrder= false;
  editCart= false;
  quantity: number;
  dish:[];
  constructor(private orderService: OrderService, private router:Router) { }

  dishObject: any = {};

  get format() {
    return 'short';
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.editOrder =false;
    
    this.orderService.getOrderFromJSON().subscribe((res) => {
      this.orders = res;
    });
  }

  getOrdersCart(id) {
    this.ordersCart = {};
    this.orderService.getCartFromJSON(id).subscribe((res) => {
      this.ordersCart = res;
    });
  }

  deleteOrdersCart(id) {
    this.ordersCart = {};
    this.orderService.deleteCartItems(id).subscribe(() => {
      this.getOrders();
    })
  }
}
