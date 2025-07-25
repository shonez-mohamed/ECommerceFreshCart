import { Component, inject } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

   private readonly authService = inject(AuthService)
   private readonly router = inject(Router)
   private readonly formBuilder = inject(FormBuilder)


    msgError : string = "" ;
    msgSuccess:string = "";
    isLoading : boolean = false;
   
     registerForm: FormGroup = this.formBuilder.group({
           name: [null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
           email: [null  , [Validators.required , Validators.email]],
           password: [null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]],
           rePassword: [null , [Validators.required]],
           phone: [null  , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
     }, { validators : this.confirmPassword } )
   submitForm():void {
     if(this.registerForm.valid){
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
         next:(res)=>{
            console.log(res);
            if(res.message === 'success'){  
                this.msgSuccess =  res.message ;
               setTimeout(() => {
                  this.router.navigate(['/login']); 
               }, 500);
                

            }
            this.isLoading = false;
         },
         error:(err:HttpErrorResponse)=>{
            console.log(err)
           this.msgError = err.error.message
            this.isLoading = false;
         }

      })
     }
     else{
      this.registerForm?.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched();
     }
   }

   confirmPassword( group:AbstractControl ){
      const password = group.get('password')?.value
      const rePassword = group.get('rePassword')?.value

         return password === rePassword ? null : {mismatch:true}
  }


}