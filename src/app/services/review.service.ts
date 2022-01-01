import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl: string = environment.apiUrl + '/api/Review';
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  public getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/reviews`, this.httpHeaders);
  }

  public getUserReviews(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/user-reviews/${userId}`, this.httpHeaders);
  }

  public getEventReviews(eventId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/event-reviews/${eventId}`, this.httpHeaders);
  }

  public getReviewById(userId: string, eventId: string): Observable<Review> {
    return this.http.get<Review>(`${this.reviewUrl}/byId/${userId}&${eventId}`, this.httpHeaders);
  }

  public createReview(review: Review): Observable<any> {
    return this.http.post(`${this.reviewUrl}/create-review`, review, this.httpHeaders);
  }

  public updateReview(review: Review): Observable<any> {
    return this.http.patch(`${this.reviewUrl}/update-review`, review, this.httpHeaders);
  }

  public deleteReview(userId: string, eventId: string): Observable<any> {
    return this.http.delete(`${this.reviewUrl}/delete-review/${userId}&${eventId}`, this.httpHeaders);
  }
}
