import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Category } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
    private brandsService = inject(BrandsService)

   allBrands : Category[] = []

   ngOnInit(): void {
       this.getAllBrands();
   }

   getAllBrands(){
     this.brandsService.getAllBrands().subscribe({
       next: (res)=>{
         this.allBrands = res.data
       }
     })
   };
}
