import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Product } from "../models/Product";
import { LoginToken } from "../models/LoginToken";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) { }

  login(un: string, pw: string){
    return this.httpClient.post<LoginToken>(environment.expressApiURI + '/login', 
    {
      username: un,
      password: pw
    });
  }

  register(username: string, email: string, password: string){
    return this.httpClient.post(environment.expressApiURI + '/register', {
      username: username,
      email: email,
      password: password
    });
  }

  listProducts(){
    return this.httpClient.get<Product[]>(environment.expressApiURI + '/products');
  }


}
