import {User} from './user';
import {Event} from './event';

export interface Ticket {
  userId: string;
  eventId: string;
  auxiliaryId: string;
  ticketType: string;
  price: string;
  priceCurrency: string;
  buyer: User;
  event: Event
}
