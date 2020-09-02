import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService {
  baseUrl = environment.baseUrl;
  constructor(private http :HttpClient) { }
  public resetPassword(employeeNo:string,oldpassword:string,password:string) {
    let headers = new HttpHeaders();
    let header = headers.set('skip', 'ABCD');
    return this.http.put(this.baseUrl+`/resetPassword`,{employeeNo:employeeNo,oldPassword:oldpassword,password:password},{headers:header,responseType:'text' as 'json'});
  }
}
