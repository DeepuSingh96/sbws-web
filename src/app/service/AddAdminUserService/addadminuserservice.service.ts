import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddAdminUserServiceService {
  constructor(private http:HttpClient) { }

  addUserByAdmin(data:any,username){
    console.log(data);
   
    return this.http.post("http://localhost:8181/dashboard/addUser",{accountName:data.AccountName,employeeNo:data.EmployeeId,employeeName:data.EmployeeName,mailId:data.MailId,role:data.Role,createdBy:username,createdDate:new Date()},{responseType:'text' as 'json'})
  }
}
