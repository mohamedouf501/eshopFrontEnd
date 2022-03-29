import { ORDER_STATUS } from './../order.constants';
import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@esohp/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
ORDER_STATUS
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getOrders();
    console.log(this.orderStatus);
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      console.log(orders);
      this.orders = orders;
    });
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      }
    });
  }
}
