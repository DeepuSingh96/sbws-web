import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public SignIn(username:string,password:string)
  {
    let employeeNo = username;

    let header = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)});
    //type of header
    return this.http.post("http://localhost:8181/login",{employeeNo:employeeNo,password:password},{headers : header,responseType:'text' as 'json'})

  }
  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticaterUser')
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem('Token')
  }

   executeJWTAuthenticationService(username:string,password:string)
  {
    let employeeNo = username;

    //let header = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)});
    //type of header
    console.log('in jwt login service')
    let headers = new HttpHeaders();
    let header = headers.set('skip', 'ABCD');
    return this.http.post<any>("http://localhost:8181/login",{employeeNo:employeeNo,password:password},{headers:header})
    .pipe(
      map(
        data=>{
          sessionStorage.setItem('authenticaterUser',username);
          sessionStorage.setItem('Token',`Bearer ${data.jwt}`);
          return data;
        }
      )
    )

  }
}
