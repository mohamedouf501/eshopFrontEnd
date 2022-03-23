import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {SlideMenuModule} from 'primeng/slidemenu';
const UX_MODULE = [
  ButtonModule,
  ToolbarModule,
  CardModule,
  TableModule,
  SlideMenuModule,
]
const routes:Routes =[
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
    HttpClientModule,
    ...UX_MODULE,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
