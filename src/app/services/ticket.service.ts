import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketUrl: string = environment.apiUrl + '/api/Ticket';
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  public getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ticketUrl}/tickets`, this.httpHeaders);
  }

  public getBuyerTickets(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ticketUrl}/buyer-tickets/${userId}`, this.httpHeaders);
  }

  public getEventTickets(eventId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ticketUrl}/event-tickets/${eventId}`, this.httpHeaders);
  }

  public getTicketById(userId: string, eventId: string, auxiliaryId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ticketUrl}/byId/${userId}&${eventId}&${auxiliaryId}`, this.httpHeaders);
  }

  public createTicket(ticket: Ticket): Observable<any> {
    return this.http.post(`${this.ticketUrl}/create-ticket`, ticket, this.httpHeaders);
  }

  public updateTicket(ticket: Ticket): Observable<any> {
    return this.http.patch(`${this.ticketUrl}/update-ticket`, ticket, this.httpHeaders);
  }

  public deleteTicket(userId: string, eventId: string, auxiliaryId: string): Observable<any> {
    return this.http.delete(`${this.ticketUrl}/delete-ticket/${userId}&${eventId}&${auxiliaryId}`, this.httpHeaders);
  }
}
