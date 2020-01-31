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
    this.dialog.open(ErrorComponent);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   // add catchError operator using pipe
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) =>
      {
        console.log(error);
        alert(error.error.error.message);
       return  throwError(error);// will generate new observable
      })
    )
  }
}
