import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeletesbwsrequestService {
  baseUrl = environment.baseUrl;

  constructor(private http :HttpClient) { }
 
  public deleterequest(username,employeeNo) {
    return this.http.delete(this.baseUrl+`/dashboard/${username}/removeUsersDetails/${employeeNo}`);
  }
}
