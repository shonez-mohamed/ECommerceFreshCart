import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

    private httpClient : HttpClient = inject(HttpClient)
   
  constructor() { }


  getAllBrands():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }

  getSpecificBrand(Id:string|null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${Id}`)
  }
}
