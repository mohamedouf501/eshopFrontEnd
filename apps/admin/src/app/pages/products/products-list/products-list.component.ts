import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from '@esohp/products';
import { productsService } from '@esohp/products';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  products: Product [] = [];
  constructor(
    private _productsService:productsService,
    private _MessageService: MessageService,
    private confirmationService: ConfirmationService
    ) {}

  ngOnInit(): void {
   this._getProducts()
    
  }

  private _getProducts(){
    this._productsService.getProducts().subscribe({
      next:(res)=>{
        this.products = res
      }
    })



  }
  deleteProducts(ProductID: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productsService.deleteProduct(ProductID).subscribe({
          next: (res) => {
            this._getProducts();
            this._MessageService.add({ severity: 'success', summary: 'success', detail: 'Product is Deleted' });
          },
          error: (err) => {
            this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'Product cannot Deleted' });
          }
        });
      },
      reject: () => {
        this._MessageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      }
    });


  }
}
