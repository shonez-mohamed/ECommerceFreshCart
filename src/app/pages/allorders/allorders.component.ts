import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { Iorder } from '../../shared/interfaces/iorder';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
    private readonly ordersService = inject(OrdersService)
    private readonly authService = inject(AuthService)
    CartItems:Iorder[] = [] ;
      
    userId:string=''
      ngOnInit(): void {
         this.authService.saveUserData();
         
         const userData = this.authService.getUserData();
         if(userData && userData.id){
           this.userId = userData.id;
          this.getUserItems(this.userId);
         }
         
      }

     getUserItems(id:string):void{
         this.ordersService.getUserOrders(id).subscribe({
           next:(res) =>{
              console.log(res) 
              this.CartItems = res;
            },
           error:(err)=>{
              console.log(err)
           }
         })
     }
}
