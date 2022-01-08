import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {TicketTypes} from '../../interfaces/ticket-types';

@Injectable({
  providedIn: 'root'
})
export class BuyerTicketsService {
  // observable sources
  private ticketTypesReceivedSource = new Subject<TicketTypes>();
  private ticketsChangedSource = new Subject<string>();
  private requestedTicketTypesSource = new Subject<boolean>();

  // observable streams
  ticketTypes$ = this.ticketTypesReceivedSource.asObservable();
  ticketsChanged$ = this.ticketsChangedSource.asObservable();
  requestedTicketTypes$ = this.requestedTicketTypesSource.asObservable();

  // service commands
  sendTicketTypes(ticketTypes: TicketTypes) {
    this.ticketTypesReceivedSource.next(ticketTypes);
  }

  changeTickets(message: string) {
    this.ticketsChangedSource.next(message);
  }

  requestTicketTypes(value: boolean) {
    this.requestedTicketTypesSource.next(value);
  }

  constructor() {
  }
}
