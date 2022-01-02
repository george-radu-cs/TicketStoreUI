import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';
import {TicketService} from '../../../../services/ticket.service';

@Component({
  selector: 'app-buyer-event-tickets',
  templateUrl: './buyer-event-tickets.component.html',
  styleUrls: ['./buyer-event-tickets.component.css']
})
export class BuyerEventTicketsComponent implements OnInit, OnChanges {
  @Input() userId: string = '';
  @Input() eventId: string = '';
  public ticketsBought: Ticket[] = [];

  constructor(
    private ticketService: TicketService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] !== undefined || changes['eventId'] !== undefined) {
      if (this.userId !== '' && this.eventId !== '') {
        this.getUserBoughtTicketsForEvent();
      }
    }
  }

  public refreshTickets(): void {
    this.getUserBoughtTicketsForEvent();
  }

  public getUserBoughtTicketsForEvent(): void {
    this.ticketService.getBuyerTicketsForAnEvent(this.userId, this.eventId).subscribe({
      next: (tickets: Ticket[]) => {
        this.ticketsBought = tickets;
      },
      error: (error) => {
        console.error(error);
        this.ticketsBought = [];
      },
      complete: () => {
      }
    });
  }
}
