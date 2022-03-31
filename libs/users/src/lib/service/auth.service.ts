import { switchMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { loginDto, User, UserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<loginDto>(`http://localhost:3000/users/login/`, { email, password }).pipe(
      switchMap((res) => {
        return of(res);
      })
    );
  }
}
