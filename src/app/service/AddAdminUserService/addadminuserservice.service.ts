import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddAdminUserServiceService {

  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  addUserByAdmin(data:any,username){
    console.log(data);
   
    return this.http.post(this.baseUrl+"/dashboard/addUser",{accountName:data.AccountName,employeeNo:data.EmployeeId,employeeName:data.EmployeeName,emailId:data.MailId,roles:data.Role,createdBy:username,createdOn:new Date()},{responseType:'text' as 'json'})
  }
}
