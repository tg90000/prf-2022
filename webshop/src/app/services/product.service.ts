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
    return this.httpClient.get<Product[]>(environment.expressApiURI + '/product');
  }

  addProduct(p: Product){
    let retval = null;
    try{
      retval= this.httpClient.post(environment.expressApiURI + '/product', 
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
      retval= this.httpClient.post(environment.expressApiURI + '/product', 
      {
        id: _id
      });
    }catch(e){
      retval="noaccess";
    }
    return retval;
  }

  addToCart(_id: string, db: number){
    console.log(_id, db);
    return this.httpClient.post(environment.expressApiURI + '/cart',
    {
      aruID: _id,
      darab: db
    });
  }

  deleteCartContent(){
    return this.httpClient.delete(environment.expressApiURI + '/cart');
  }

  listCart(){
    return this.httpClient.get<Product[]>(environment.expressApiURI + '/cart');
  }

  buyProducts(){
    return this.httpClient.delete(environment.expressApiURI + '/buy');
  }

  

}
