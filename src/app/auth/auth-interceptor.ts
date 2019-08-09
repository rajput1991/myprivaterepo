import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{ // we want to intercept any outgoing req.

  constructor(private authservice: AuthService)
  {

  }
  intercept(req: HttpRequest<any>,next: HttpHandler)
  { // next allows to leave the interceptor and allows other part of app or to continue this req journey in app
    // but we have to manimulate req. with token , so inject authservice first
    const token = this.authservice.getToken();
    return next.handle(req);
    // continue req journey
  }
}
