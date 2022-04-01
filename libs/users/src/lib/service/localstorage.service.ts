/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

const token = 'JwtToken';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() {}
  setToken(data: string) {
    localStorage.setItem(token, data);
  }
  getToken(): string {
    return localStorage.getItem(token);
  }
  removeToken() {
    return localStorage.removeItem(token);
  }
}
