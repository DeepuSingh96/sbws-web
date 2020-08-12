import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {


  constructor(
    private loginJwtService : LoginService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{

      let basicAuth =    this.loginJwtService.getAuthenticatedUser();
      let token = this.loginJwtService.getAuthenticatedToken();
     // console.log(request.headers.get("skip"));
      //console.log(request.headers);


      if (request.headers.get("skip"))
      {
        console.log('First URL');
          return next.handle(request);
      }
          console.log('http Interceptor'+ token)
          console.log(token);

          request = request.clone({
            setHeaders : {
                Authorization : token
              }
            });


    return next.handle(request);

  }



}
