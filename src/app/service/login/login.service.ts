import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  public SignIn(username:string,password:string)
  {
    let employeeNo = username;

    let header = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)});
    //type of header
    return this.http.post(this.baseUrl+"/login",{employeeNo:employeeNo,password:password},{headers : header,responseType:'text' as 'json'})

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
    console.log('service url '+this.baseUrl+"/login");
    let headers = new HttpHeaders();
    let header = headers.set('skip', 'ABCD');
    return this.http.post<any>(this.baseUrl+"/login",{employeeNo:employeeNo,password:password},{headers:header})
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
