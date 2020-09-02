import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  baseUrl = environment.baseUrl;
  constructor(private http :HttpClient) { }
  public resetPassword(employeeNo:string,oldpassword:string,password:string) {
    return this.http.put(this.baseUrl+`/resetPassword`,{employeeNo:employeeNo,oldPassword:oldpassword,password:password},{responseType:'text' as 'json'});
  }
}
