import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Element} from '../../components/pages/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  retrieveDashboard(username)
  {
    return this.http.get<Element[]>(`http://localhost:8181/dashboard/${username}/allEmployeeDetails`)
  }
}
