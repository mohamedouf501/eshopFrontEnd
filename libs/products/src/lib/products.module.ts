import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsSearchComponent } from './components/products-search/products-search.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    ProductsSearchComponent
  ],
  exports:[ProductsSearchComponent]
})
export class ProductsModule {}
