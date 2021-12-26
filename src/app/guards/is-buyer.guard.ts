import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsBuyerGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token'); // get the token from local storage
    if (!token) { // if token doesn't exist in local storage
      return false;
    }
    // decode the claims from the jwt token
    const decoderJWT = JSON.parse(window.atob(token.split('.')[1]));
    if (decoderJWT.role !== 'Buyer') {
      // TODO redirect
      return false;
    }

    return true;
  }

}
