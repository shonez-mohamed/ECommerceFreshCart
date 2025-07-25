import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../shared/interfaces/icart';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
        private categoriesService= inject(CategoriesService)

    allCategories : Category[] = []

    ngOnInit(): void {
        this.getAllCategories();
      
    }


    getAllCategories(){
       this.categoriesService.getAllCategories().subscribe({
         next: (res) => {
           this.allCategories = res.data
         }
       })
    };
}
