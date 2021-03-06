import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {filter, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Event} from '../interfaces/event';
import {FilterEvents} from '../interfaces/filter-events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventUrl: string = environment.apiUrl + '/api/Event';
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  public getEvents(filterEventsOptions: FilterEvents): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventUrl}/events?filter=${filterEventsOptions.limit}&offset=${filterEventsOptions.offset}`
      , this.httpHeaders);
  }

  public getOrganizerEvents(id: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventUrl}/organizer-events/${id}`, this.httpHeaders);
  }

  public getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventUrl}/byId/${id}`, this.httpHeaders);
  }

  public createEvent(event: Event): Observable<any> {
    return this.http.post(`${this.eventUrl}/create-event`, event, this.httpHeaders);
  }

  public editEvent(event: Event): Observable<any> {
    return this.http.patch(`${this.eventUrl}/update-event`, event, this.httpHeaders);
  }

  public deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.eventUrl}/delete/${id}`, this.httpHeaders);
  }
}
