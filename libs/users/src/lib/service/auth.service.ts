import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { loginDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private token: LocalstorageService, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<loginDto>(`http://localhost:3000/users/login/`, { email, password });
  }
  logOut() {
    this.token.removeToken();
    this.router.navigate(['/login'])
  }
}
