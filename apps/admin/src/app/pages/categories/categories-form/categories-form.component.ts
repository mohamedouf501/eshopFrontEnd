import { Category } from '@esohp/products';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@esohp/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
  isSubmitted = false;
  editMode = false;
  currentCategoryID!: string;

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    icon: new FormControl(null, Validators.required),
    color: new FormControl('#fff', Validators.required)
  });
  constructor(
    private _CategoriesService: CategoriesService,
    private _MessageService: MessageService,
    private _Location: Location,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._checkEditMode();
  }
  private _checkEditMode() {
    this._ActivatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryID = params['id'];
        this._CategoriesService.getCategory(params['id']).subscribe((res) => {
          this.form.patchValue({
            name: res.name,
            icon: res.icon,
            color: res.color
          });
        });
      }
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const Category: Category = {
      id: this.currentCategoryID,
      name: this.form.value.name,
      icon: this.form.value.icon,
      color: this.form.value.color
    };
    if (this.editMode) {
      this._updateCategory(Category);
    } else {
      this._addCategory(Category);
    }
  }
  private _updateCategory(Category: Category) {
    this._CategoriesService.updateCategory(Category).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'success', detail: 'Category is Update' });
        timer(2000).subscribe(() => this._Location.back());
      },
      error: (err) => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    });
  }
  private _addCategory(Category: Category) {
    this._CategoriesService.createCategory(Category).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'success', detail: 'Category is Created' });
        timer(2000).subscribe(() => this._Location.back());
      },
      error: (err) => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    });
  }
  onCancle() {
    this._Location.back();
  }
}
