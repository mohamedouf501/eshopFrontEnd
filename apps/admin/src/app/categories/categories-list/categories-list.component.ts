import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@esohp/products';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  Categories:Category [] = []
   constructor(
    private categoriesService: CategoriesService
      ) { }

  ngOnInit(): void {
this.categoriesService.getCategories().subscribe({
      next:(res)=>{
        this.Categories=res
      }
    })
    

  }

}
