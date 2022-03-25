import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@esohp/products';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: []
})
export class CategoriesListComponent implements OnInit {
  Categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private _MessageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }
  deleteCategory(CategoryID: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(CategoryID).subscribe({
          next: (res) => {
            this._getCategories();
            this._MessageService.add({ severity: 'success', summary: 'success', detail: 'Category is Deleted' });
          },
          error: (err) => {
            this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'Category cannot Deleted' });
          }
        });
      },
      reject: () => {
        this._MessageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      }
    });
  }

  
  private _getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.Categories = res;
      }
    });
  }
}
