import { orderCountDto, OrdersDto, totalSalesDto } from './../models/order';
import { Order } from '@esohp/orders';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<OrdersDto>(`http://localhost:3000/orders/`).pipe(
      switchMap((res) => {
        return of(res.Orders);
      })
    );
  }

  getOrder(orderId: string) {
    return this.http.get<OrdersDto>(`http://localhost:3000/orders/${orderId}`).pipe(
      switchMap((res) => {
        return of(res.order);
      })
    );
  }

  createOrder(order: Order) {
    return this.http.post<Order>(`http://localhost:3000/orders/`, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`http://localhost:3000/orders/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string) {
    return this.http.delete<any>(`http://localhost:3000/orders/${orderId}`);
  }
  getOrdersCount() {
    return this.http.get<orderCountDto>(`http://localhost:3000/orders/get/OrderCount`).pipe(
      switchMap((res) => {
        return of(res.OrderCount);
      })
    );
  }
  getTotalSales() {
    return this.http.get<totalSalesDto>(`http://localhost:3000/orders/get/totalSales`).pipe(
      switchMap((res) => {
        return of(res.totalSales);
      })
    )
  }
}
