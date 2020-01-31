import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
  constructor(private dialog: MatDialog)
  {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   // add catchError operator using pipe
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) =>
      {
        let errorMessage = 'An unknown error occured';
        console.log(error);
        if (error.error.message) {
          errorMessage = error.error.message;

        }
       // alert(error.error.error.message);
        this.dialog.open(ErrorComponent, { data: {message:errorMessage}});
       return  throwError(error);// will generate new observable
      })
    )
  }
}
