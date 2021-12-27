import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private getUserUrl: string = environment.apiUrl + '/api/Authentication/user';
  private userInfo = new BehaviorSubject<User>({} as User);
  public currentUser = this.userInfo.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<User>(this.getUserUrl)
      .subscribe(user => {
        this.updateUserInfo(user);
      });
  }

  public updateUserInfo(user: User): void {
    this.userInfo.next(user);
  }
}
