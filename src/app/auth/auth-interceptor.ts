import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{ // we want to intercept any outgoing req.

  constructor(private authservice: AuthService)
  {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler)
  {
    console.log("Intercepting req");
    // next allows to leave the interceptor and allows other part of app or to continue this req journey in app
    // but we have to manimulate req. with token , so inject authservice first
    const authtoken = this.authservice.getToken();
    // notice we should clone req first to avoid any unwanted manipulation
    const authRequest = req.clone({
      // original header + append token
      headers: req.headers.set('Authorization', 'Bearer ' + authtoken) // notice we using authorization header only at backend and splitting
      //it based on whitspace
    }); // will create copy of req and we can also pass configuration to clone

    console.log("Chanaged req" + authRequest.headers);
    // do remember if we reload our application token is gone because its in memory. so login and then add post without reloading app.
    // most important
    return next.handle(authRequest);

    // continue req journey
  }
}
