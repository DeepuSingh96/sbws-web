import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddAdminUserServiceService {
  constructor(private http:HttpClient) { }

  addUserByAdmin(data:any){
    console.log(data.AccountName);
   
    return this.http.post("http://localhost:8181/dashboard/addUser",{accountName:data.AccountName,employeeId:data.EmployeeId,employeeName:data.EmployeeName,mailId:data.MailId,role:data.Role},{responseType:'text' as 'json'})
  }
}
