import { timer } from 'rxjs';
/* eslint-disable @typescript-eslint/member-ordering */
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { productsService, Category, CategoriesService, Product } from '@esohp/products';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: []
})
export class ProductsFormComponent implements OnInit {
  isSubmitted = false;
  editMode = false;
  currentProductID!: string;
  Categories: Category[] = [];
  imageDisplay: string | ArrayBuffer;
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    brand: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    countInStock: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    richDescription: new FormControl(null, Validators.required),
    images: new FormControl(null),
    image: new FormControl(null, Validators.required),
    isFeatured: new FormControl(false)
  });
  constructor(
    private _productsService: productsService,
    private _MessageService: MessageService,
    private _Location: Location,
    private _ActivatedRoute: ActivatedRoute,
    private _categoriesService: CategoriesService
  ) {}
  ngOnInit(): void {
    this._checkEditMode();
    this._getCategories();
  }
  private _getCategories() {
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        this.Categories = res;
      }
    });
  }
  private _checkEditMode() {
    this._ActivatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductID = params['id'];
        this._productsService.getProduct(params['id']).subscribe((res) => {
          this.form.patchValue({
            name: res.name,
            brand: res.brand,
            price: res.price,
            category: res.category.id,
            countInStock: res.countInStock,
            description: res.description,
            richDescription: res.richDescription,
            isFeatured: res.isFeatured
          });
          this.form.get('image').clearValidators();
          this.imageDisplay = res.image;
          this.form.get('image').updateValueAndValidity();
        });
      }
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form);

    if (this.form.invalid) {
      return;
    }
    const productFormData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      productFormData.append(key, this.form.get(key).value);
    });
    console.log(this.form.get('category').value);
    if (this.editMode) {
      this._updateproduct(productFormData);
    } else {
      this._addproduct(productFormData);
    }
  }
  private _updateproduct(product: FormData) {
    this._productsService.updateproduct(product, this.currentProductID).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'success', detail: 'product is Update' });
        timer(2000).subscribe(() => this._Location.back());
      },
      error: (err) => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    });
  }

  private _addproduct(product: FormData) {
    this._productsService.createproduct(product).subscribe({
      next: (res) => {
        console.log(res);
        this._MessageService.add({ severity: 'success', summary: 'success', detail: 'product is Created' });
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

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
}
