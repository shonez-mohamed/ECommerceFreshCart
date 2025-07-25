import { Component, computed, inject, input, Input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

   isLogin=input<boolean>(true)

     
   private readonly authService = inject(AuthService)
   private readonly myTranslateService = inject(MyTranslateService)
   private readonly translateService = inject(TranslateService)
   private readonly cartService = inject(CartService)

     countNumber:Signal<number> = computed(()=> this.cartService.cartNumber())

   logOut():void{
       this.authService.logOut();
   }

  ngOnInit(): void {

      this.cartService.getLoggedUserCart().subscribe({
         next:(res)=>{
            console.log('cart items' , res);
            this.cartService.cartNumber.set(res.numOfCartItems)
         }
      })  
  }

  change(lang:string):void{
       this.myTranslateService.changeLangTranslate(lang);
  }

  checkCurrentLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }
}
