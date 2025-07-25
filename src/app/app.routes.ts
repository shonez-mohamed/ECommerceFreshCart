import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'' , component:AuthLayoutComponent , canActivate:[logedGuard] ,children:[
        {path:'login', component:LoginComponent , title:'login'},
        {path:'register', loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent) , title:'register'},
        {path:'forgot', loadComponent:()=>import('./pages/forgotpassword/forgotpassword.component').then((c)=>c.ForgotpasswordComponent) , title:'forgot'},
    ]},
    {path:'' , component:BlankLayoutComponent , canActivate:[authGuard] , children:[
        {path:'home' , component:HomeComponent , title:'home' },
        {path:'cart' , loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent) , title:'cart'},
        {path:'products' , loadComponent:()=> import('./pages/products/products.component').then((c)=>c.ProductsComponent) , title:'products'},
        {path:'allorders' , loadComponent:()=> import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent) , title:'allorders'},
        {path:'brands' , loadComponent:()=> import('./pages/brands/brands.component').then((c)=>c.BrandsComponent) , title:'brands'},
        {path:'categories' , loadComponent:()=> import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent) , title:'categories'},
        {path:'details/:id' , component:DetailsComponent , title:'details'},
        {path:'checkout/:id' , loadComponent:()=> import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent) , title:'checkout'},
        {path:'**' , component:NotfoundComponent},
    ]},
];
