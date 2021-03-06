import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { LoginToken } from "../models/LoginToken";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) { }

  public login(un: string, pw: string){
    return this.httpClient.post<LoginToken>(environment.expressApiURI + '/login', 
    {
      username: un,
      password: pw
    });
  }

  public register(username: string, email: string, password: string){
    return this.httpClient.post(environment.expressApiURI + '/register', 
    {
      username: username,
      email: email,
      password: password
    });
  }
}
