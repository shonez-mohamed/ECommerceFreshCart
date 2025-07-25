import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe} from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [CarouselModule , FormsModule , RouterLink , CurrencyPipe , TitleCasePipe , TermtextPipe , SearchPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService= inject(CartService);
  private readonly toastrService = inject(ToastrService);

   products:WritableSignal<IProduct[]> = signal([]);
   categories:WritableSignal<ICategory[]> = signal([]);

   text: string = " " ;

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    autoplay:true,   
    autoplayTimeout:3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

   ngOnInit(): void {
      this.getProductsData();
      this.getCategoriesData();
   }



   getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
         console.log(res.data);
         this.products.set(res.data);
      }
    })
   }
   getCategoriesData(){
        this.categoriesService.getAllCategories().subscribe({
          next:(res)=>{
            console.log(res.data);
            this.categories.set(res.data);
          }
        })
   }

  addToCart(id:string):void{
     this.cartService.addProductToCart(id).subscribe({
       next:(res)=>{
          console.log(res)
          if(res.status === 'success'){
             this.toastrService.success(res.message , 'FreshCart')
              this.cartService.cartNumber.set(res.numOfCartItems);
          }
       }
     })
  }

} 
