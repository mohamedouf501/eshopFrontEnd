import { Category } from './../models/category';
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { CategoryDto } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  getCategories() {
    return this.http.get<CategoryDto>('http://localhost:3000/Categories/').pipe(
      switchMap((res) => {
        return of(res.categories);
      })
    );
  }
  createCategory(Category: Category) {
    return this.http.post<Category>('http://localhost:3000/Categories/', Category);
  }
  deleteCategory(CategoryID: string) {
    return this.http.delete<object>(`http://localhost:3000/Categories/${CategoryID}`);
  }
}
