import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser} from '../interfaces/login-user';
import {RegisterUser} from '../interfaces/register-user';
import {Observable} from 'rxjs';
import {Token} from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = environment.apiUrl + '/api/Authentication';
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  public login(data: LoginUser): Observable<Token> {
    return this.http.post<Token>(`${this.authUrl}/login`, data, this.httpHeaders);
  }

  register(data: RegisterUser): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/sign-up`, data, this.httpHeaders);
  }
}
