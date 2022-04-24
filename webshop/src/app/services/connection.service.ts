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

  


}
