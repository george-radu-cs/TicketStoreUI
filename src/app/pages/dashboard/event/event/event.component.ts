import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import {Event} from '../../../../interfaces/event';
import {HttpErrorResponse} from '@angular/common/http';
import * as dayjs from 'dayjs';
import {Review} from '../../../../interfaces/review';
import {Ticket} from '../../../../interfaces/ticket';
import {TicketService} from '../../../../services/ticket.service';
import {ReviewService} from '../../../../services/review.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private id: string = '';
  public event: Event | null = null;
  public eventReviews: Review[] = [];
  public eventTickets: Ticket[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private reviewService: ReviewService,
    private ticketService: TicketService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getEvent();
        this.getEventReviews();
        this.getEventTickets();
      }
    });
  }

  public formatDate(date: string): string {
    return dayjs(date).format('DD-MMM-YYYY, hh:mm').toString();
  }

  public getEventTicketsSold(): number {
    return this.eventTickets.length;
  }

  public getEvent(): void {
    this.eventService.getEventById(this.id).subscribe({
      next: (event: Event) => {
        this.event = event;
      },
      error: (error: HttpErrorResponse) => console.error(error.error),
      complete: () => {
      },
    });
  }

  public getEventReviews(): void {
    this.reviewService.getEventReviews(this.id).subscribe({
      next: (reviews: Review[]) => {
        this.eventReviews = reviews;
      },
      error: (error: HttpErrorResponse) => console.error(error.error),
      complete: () => {
      },
    });
  }

  public getEventTickets(): void {
    this.ticketService.getEventTickets(this.id).subscribe({
      next: (tickets: Ticket[]) => {
        this.eventTickets = tickets;
      },
      error: (error: HttpErrorResponse) => console.error(error.error),
      complete: () => {
      },
    });
  }
}
