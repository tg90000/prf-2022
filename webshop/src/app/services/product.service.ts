import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Product } from "../models/Product";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  listAll(){
    return this.httpClient.get<Product[]>(environment.expressApiURI + '/products');
  }

  addProduct(p: Product){
    let retval = null;
    try{
      retval= this.httpClient.post(environment.expressApiURI + '/products', 
      {
        nev: p.nev,
        ar: p.ar,
        darab: p.darab
      });
    }catch(e){
      retval="noaccess";
    }
    return retval;
  }

  deleteProduct(_id: string){
    let retval = null;
    try{
      retval= this.httpClient.post(environment.expressApiURI + '/products', 
      {
        id: _id
      });
    }catch(e){
      retval="noaccess";
    }
    return retval;
  }
}
