import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  imports: [RouterLink , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private productService = inject(ProductsService)
  private cartService:CartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  @Input({required:true}) cardProduct!:IProduct
  allProducts : WritableSignal<IProduct[]> = signal<IProduct[]>([])
   searchWord : string = " ";

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

   ngOnInit(): void {
    
     this.getAllProducts();
    
   }
   getAllProducts(){
     this.productService.getAllProducts().subscribe({
       next : (res) => {
         this.allProducts.set(res.data)
       }
     })
   }
}
