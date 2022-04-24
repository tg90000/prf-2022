import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  create(jwt: string, username: string) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('username', username);
  }

  destroy() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('username');
  }

  public isLoggedIn() {
    const jwt = localStorage.getItem('jwt');
    return !!jwt;
  }
}
