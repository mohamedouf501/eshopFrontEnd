import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';

export const usersRoutes: Route[] = [];
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent]
})
export class UsersModule {}
