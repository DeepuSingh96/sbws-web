import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Element} from '../../components/pages/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

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
    return this.http.get<Element[]>(`http://localhost:8181/dashboard/${username}/allEmployeeDetails`,{headers:headers})
  }
}
