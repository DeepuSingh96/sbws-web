import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeletesbwsrequestService {
  

  constructor(private http :HttpClient) { }
 
  public deleterequest(username,employeeNo) {
    return this.http.delete(`http://localhost:8181/dashboard/${username}/removeUsersDetails/${employeeNo}`);
  }
}
