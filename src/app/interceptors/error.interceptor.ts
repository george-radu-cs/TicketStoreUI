import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {ErrorDialogService} from '../services/error-dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorDialogService: ErrorDialogService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const data = {
          message: error && error.error ? error.error : '',
          status: error.status,
        };
        if (error.status !== 404) { // suppress 404 errors
          this.errorDialogService.openDialog(data);
        }
        return throwError(() => error);
      })
    );
  }
}
