import {Location} from './location';
import {TicketTypes} from './ticket-types';
import {User} from './user';
import {Guest} from './guest';

export interface Event {
  id: string;
  name: string;
  shortName: string;
  description: string;
  startDate: Date;
  endDate: string;
  category: string;
  genre: string;
  location: Location;
  ticketTypes: TicketTypes;
  organizer: User;
  guests: Guest[];
}
