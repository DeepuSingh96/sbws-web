import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Element} from '../../components/pages/dashboard/dashboard.component';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  retrieveDashboard(username)
  {
     let headers = new HttpHeaders();
    // let headers = new HttpHeaders({
    //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNDMwMjA4IiwiZXhwIjoxNTk2NzUxODc1LCJpYXQiOjE1OTY3MTU4NzV9.pOII7WOIt1Q6mTJn7mkquGDh9sgHAiohRXQ84jqV43Q'
    //   })
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNDMwMjA4IiwiZXhwIjoxNTk2NzUzMjI5LCJpYXQiOjE1OTY3MTcyMjl9.nLDYsX--EGNc7i-FWx8PsnP73t0FHV44twAJnX14TTo')
    // }
    headers = headers.set('Authorization', 'Basic xzeydyt==');
    return this.http.get<Element[]>(this.baseUrl+`/dashboard/${username}/allEmployeeDetails`,{headers:headers})
  }

  retrievedeleteDashboard(username)
  {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic xzeydyt==');
    return this.http.get<Element[]>(this.baseUrl+`/dashboard/${username}/allEmployeeDetails/deletedStatus`,{headers:headers})
  }

  retrievependingDashboard(username)
  {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic xzeydyt==');
    return this.http.get<Element[]>(this.baseUrl+`/dashboard/${username}/allEmployeeDetails/pendingStatus`,{headers:headers})
  }
}
