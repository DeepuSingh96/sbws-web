import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreatesbwsrequestService {

  constructor(private http :HttpClient) { }
  public createrequest(sachin)
  {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(sachin);
    //console.log(body);
    return this.http.post("http://localhost:8181/dashboard/mohit/usersDetails",body,{'headers':headers});
  }
  public updaterequest(username,employeeNo,upData) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(upData);
    console.log(body);
    return this.http.put(`http://localhost:8181/dashboard/${username}/usersDetails/${employeeNo}`,body,{'headers':headers});
  }
}
