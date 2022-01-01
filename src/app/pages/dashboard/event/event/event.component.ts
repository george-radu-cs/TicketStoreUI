import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import {Event} from '../../../../interfaces/event';
import * as dayjs from 'dayjs';
import {Review} from '../../../../interfaces/review';
import {Ticket} from '../../../../interfaces/ticket';
import {TicketService} from '../../../../services/ticket.service';
import {ReviewService} from '../../../../services/review.service';
import {User} from '../../../../interfaces/user';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public id: string = '';
  public event: Event | null = null;
  public eventReviews: Review[] = [];
  public eventTickets: Ticket[] = [];
  public user: User = {id: ''} as User;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private reviewService: ReviewService,
    private ticketService: TicketService,
    private dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getEvent();
        this.getEventReviews();
        this.getEventTickets();
        this.getCurrentUser();
      }
    });
  }

  public formatDate(date: string): string {
    return dayjs(date.toLocaleLowerCase()).format('DD-MMM-YYYY, hh:mm').toString();
  }

  public getEventTicketsSold(): number {
    return this.eventTickets.length;
  }

  public refreshReviews(eventName: string): void {
    switch (eventName) {
      case 'added-review':
      case 'updated-review':
      case 'deleted-review':
      default:
        this.getEventReviews();
        break;
    }
  }

  public getEvent(): void {
    this.eventService.getEventById(this.id).subscribe({
      next: (event: Event) => {
        this.event = event;
      },
      error: (error) => console.error(error),
      complete: () => {
      },
    });
  }

  public getEventReviews(): void {
    this.reviewService.getEventReviews(this.id).subscribe({
      next: (reviews: Review[]) => {
        this.eventReviews = reviews;
      },
      error: (error) => console.error(error),
      complete: () => {
      },
    });
  }

  public getEventTickets(): void {
    this.ticketService.getEventTickets(this.id).subscribe({
      next: (tickets: Ticket[]) => {
        this.eventTickets = tickets;
      },
      error: (error) => console.error(error),
      complete: () => {
      },
    });
  }

  public getCurrentUser(): void {
    this.dataService.currentUser.subscribe(u => {
      this.user = u;
    });
  }
}
