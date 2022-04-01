import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { User, UserDto, usersCountDto } from '../models/user.model';
import * as countriesLib from 'i18n-iso-countries';
declare const require: (arg0: string) => countriesLib.LocaleData;
@Injectable({
  providedIn: 'root'
})
export class usersService {
  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers() {
    return this.http.get<UserDto>('http://localhost:3000/users/').pipe(
      switchMap((res) => {
        return of(res.users);
      })
    );
  }
  getUser(UserID: string) {
    return this.http.get<UserDto>(`http://localhost:3000/users/${UserID}/`).pipe(
      switchMap((res) => {
        return of(res.user);
      })
    );
  }
  createUser(user: User) {
    return this.http.post<User>(`http://localhost:3000/users/`, user);
  }

  updateUser(user: User) {
    console.log(user);
    return this.http.put<User>(`http://localhost:3000/users/${user.id}/`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<any>(`http://localhost:3000/users/${userId}/`);
  }
  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string) {
    return countriesLib.getName(countryKey, 'en', { select: 'official' });
  }
  getUsersCount(){
    return this.http.get<usersCountDto>(`http://localhost:3000/users/get/count`).pipe(
      switchMap((res) => {
        return of(res.UserCount);
      })
    );
  }
}
