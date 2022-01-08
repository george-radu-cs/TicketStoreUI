import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';
import {TicketService} from '../../../../services/ticket.service';
import {BuyerTicketsService} from '../../../../shared/services/buyer-tickets.service';
import {Subscription} from 'rxjs';
import {TicketTypes} from '../../../../interfaces/ticket-types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {snackbarDuration} from '../../../../shared/utils/utils';

@Component({
  selector: 'app-buyer-event-tickets',
  templateUrl: './buyer-event-tickets.component.html',
  styleUrls: ['./buyer-event-tickets.component.css']
})
export class BuyerEventTicketsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userId: string = '';
  @Input() eventId: string = '';
  @Input() ticketTypes!: TicketTypes;
  public ticketsBought: Ticket[] = [];
  public fetchedTickets: boolean = false;
  subscriptionMessages: Subscription;
  subscriptionSendInfo: Subscription;

  constructor(
    private ticketService: TicketService,
    private buyerTicketsService: BuyerTicketsService,
    private snackBar: MatSnackBar,
  ) {
    this.subscriptionMessages = buyerTicketsService.ticketsChanged$.subscribe(message => {
      this.snackBar.open(message, '', {duration: snackbarDuration});
      this.refreshTickets();
    });
    this.subscriptionSendInfo = buyerTicketsService.requestedTicketTypes$.subscribe(value => {
      this.sendTicketTypes();
    });
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

  ngOnDestroy() {
    this.subscriptionMessages.unsubscribe();
    this.subscriptionSendInfo.unsubscribe();
  }

  private sendTicketTypes(): void {
    this.buyerTicketsService.sendTicketTypes(this.ticketTypes);
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
        this.ticketsBought = [];
        this.fetchedTickets = true;
      },
      complete: () => {
        this.fetchedTickets = true;
        this.sendTicketTypes();
      }
    });
  }
}
