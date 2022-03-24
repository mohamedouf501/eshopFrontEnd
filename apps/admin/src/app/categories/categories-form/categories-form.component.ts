import { Category } from '@esohp/products';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@esohp/products';
import { MessageService } from 'primeng/api';
import {  timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
  isSubmitted = false;
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    icon: new FormControl(null, Validators.required)
  });
  constructor(
    private _CategoriesService: CategoriesService,
    private _MessageService: MessageService,
    private _Location: Location
  ) {}
  ngOnInit(): void {}
  onSubmit() {
    console.log();
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const Category: Category = {
      name: this.form.value.name,
      icon: this.form.value.icon
    };
    this._CategoriesService.createCategory(Category).subscribe({
      next: () => {},
      error: (err) => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      },
      complete: () => {
        this._MessageService.add({ severity: 'success', summary: 'success', detail: 'Category is Created' });
        timer(2000).subscribe(() => this._Location.back());
      }
    });
  }
}
