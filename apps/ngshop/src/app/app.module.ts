import { UiModule } from '@esohp/ui';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'products', component: ProductListComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    FooterComponent,
    HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    UiModule, 
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
