import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http :HttpClient) { }
  public resetPassword(employeeNo:string,oldpassword:string,password:string) {
    return this.http.put(`http://localhost:8181/resetPassword`,{employeeNo:employeeNo,oldpassword:oldpassword,password:password},{responseType:'text' as 'json'});
  }
}
