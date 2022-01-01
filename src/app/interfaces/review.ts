import {User} from './user';
import {Event} from './event';

export interface Review {
  userId: string;
  eventId: string;
  title: string;
  message: string;
  rating: number;
  date: string;
  user: User;
  event: Event;
}
