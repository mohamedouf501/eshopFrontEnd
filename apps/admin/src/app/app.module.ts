import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import {CardModule} from 'primeng/card';

const routes :Routes =[
  {
    path:'',
    component:ShellComponent , 
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'categories',
        component:CategoriesListComponent
      },
    ]
  },

]
@NgModule({
  declarations: [AppComponent, ShellComponent, DashboardComponent, SidebarComponent, CategoriesListComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
