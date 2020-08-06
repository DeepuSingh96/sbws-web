import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isUserLoggedIn()
  {
    let user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  logout()
  {
      sessionStorage.removeItem('authenticaterUser');
      sessionStorage.removeItem('userRole');
  }

}
