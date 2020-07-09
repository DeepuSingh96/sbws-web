import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public SignIn(username:string,password:string)
  {
    let employeeNo = username;
    const headers = new HttpHeaders({AUTHORIZATION: 'Basic '+btoa(username+":"+password)});
    return this.http.post("http://localhost:8181/login",{employeeNo:employeeNo,password:password},{responseType:'text' as 'json'})
  }
}
