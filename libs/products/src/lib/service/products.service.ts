import { Product, productsCountDto, ProductsDto } from './../models/producta';
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class productsService {
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get<ProductsDto>('http://localhost:3000/products/').pipe(
      switchMap((res) => {
        return of(res.Products);
      })
    );
  }

  getProduct(ProductID: string) {
    return this.http.get<ProductsDto>(`http://localhost:3000/products/${ProductID}`).pipe(
      switchMap((res) => {
        return of(res.productData);
      })
    );
  }
  createproduct(Product: FormData) {
    return this.http.post<Product>('http://localhost:3000/products/', Product);
  }
  deleteProduct(ProductID: string) {
    return this.http.delete<object>(`http://localhost:3000/products/${ProductID}`);
  }
  updateproduct(Product: FormData, ProductID: string) {
    return this.http.put<Product>(`http://localhost:3000/products/${ProductID}`, Product);
  }
  getProductsCount() {
    return this.http.get<productsCountDto>(`http://localhost:3000/products/get/count`).pipe(
      switchMap((res) => {
        return of(res.productCount);
      })
    );
  }
}
