import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // try to get the token from local storage
    const token = localStorage.getItem('token');

    if (!token) { // if token doesn't exist in local storage return the request given
      return next.handle(request);
    }

    // clone the request and add the authorization header
    const requestWithAuth = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    // pass the observable with the authorization header included
    return next.handle(requestWithAuth);
  }
}
