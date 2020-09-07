import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatesbwsrequestService {
  baseUrl = environment.baseUrl;
  constructor(private http :HttpClient) { }
  public createrequest(request)
  {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(request);
    const username=sessionStorage.getItem('authenticaterUser')
    return this.http.post<any>(this.baseUrl+`/dashboard/${username}/adminRequest`,body,{'headers':headers,responseType: 'text'as 'json'});

  }
  public updaterequest(username,employeeNo,upData) {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(upData);
    //console.log(body);
    return this.http.put(this.baseUrl+`/dashboard/${username}/usersDetails/${employeeNo}`,body,{'headers':headers});
  }

  public uploadefilerequest(request)
  {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(request);
    const username=sessionStorage.getItem('authenticaterUser')
    return this.http.post<any>(this.baseUrl+`/dashboard/${username}/usersDetails`,body,{'headers':headers,responseType: 'text'as 'json'});
  }

}
