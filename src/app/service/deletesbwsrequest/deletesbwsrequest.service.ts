import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeletesbwsrequestService {
  

  constructor(private http :HttpClient) { }
 
  public deleterequest(username,employeeNo,Delete) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(Delete);
   // console.log(body);
    return this.http.delete(`http://localhost:8181/dashboard/${username}/usersDetails/${employeeNo}`);
  }
}
