import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';


import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {SlideMenuModule} from 'primeng/slidemenu';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';


const UX_MODULE = [
  ButtonModule,
  ToolbarModule,
  CardModule,
  TableModule,
  SlideMenuModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule
  
  
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
      {
        path:'categories/form',
        component:CategoriesFormComponent
      },
      {
        path:'categories/form/:id',
        component:CategoriesFormComponent
      },
    ]
  },
]
@NgModule({
  declarations: [AppComponent, ShellComponent, DashboardComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ...UX_MODULE,
    
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
