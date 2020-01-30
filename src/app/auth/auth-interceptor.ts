import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // we want to intercept any outgoing req from FrontEnd application
  constructor(private authservice: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Angular Framework will call this intercept method for every req. leaving frontend App
    console.log("============Intercepting [req]: " + req.url);
    // next allows to leave the interceptor and allows other part of app or to continue this req journey in remaining App
    // but we have to manipulate req. with token , so inject Authservice first
    const authtoken = this.authservice.getToken();
    // Notice we should clone req first to avoid any unwanted manipulation of original req
    const authRequest = req.clone({
      // original header + append token
      // header name is  is case senstive, you have to use only small case authorization at backend
      headers: req.headers.set("Authorization", "Bearer " + authtoken)
      // Notice we using authorization header only at backend and splitting it based on whitspace
    }); // will create copy of req and we can also pass configuration to clone

    console.log(
      "Manipulated original req---New req headers are " + authRequest.headers
    );
    // do remember if we reload our application token is gone because its in memory. so login and then add post without reloading app.
    // most important
    return next.handle(authRequest);
    // continue req journey
  }
}
