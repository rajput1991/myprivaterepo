import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   // add catchError operator using pipe
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) =>
      {
        console.log(error);
        alert(error.error.message);
       return  throwError(error);// will generate new observable
      })
    )
  }
}
