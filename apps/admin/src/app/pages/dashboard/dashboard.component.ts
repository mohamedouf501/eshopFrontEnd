/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@esohp/orders';
import { productsService } from '@esohp/products';
import { usersService } from '@esohp/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private userService: usersService,
    private productService: productsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
       this.userService.getUsersCount(),
       this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}
