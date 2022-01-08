import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';
import {TicketService} from '../../../../services/ticket.service';
import {BuyerTicketsService} from '../../../../shared/services/buyer-tickets.service';
import {TicketTypes} from '../../../../interfaces/ticket-types';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ticket-presentation-edit',
  templateUrl: './ticket-presentation-edit.component.html',
  styleUrls: ['./ticket-presentation-edit.component.css']
})
export class TicketPresentationEditComponent implements OnInit, OnDestroy {
  @Input() ticket: Ticket | null = null;
  public isEditing = false;
  public ticketTypes!: TicketTypes;
  private subscription: Subscription;

  constructor(
    private ticketService: TicketService,
    private buyerTicketService: BuyerTicketsService,
  ) {
    this.subscription = buyerTicketService.ticketTypes$.subscribe(
      (ticketTypes) => {
        this.ticketTypes = ticketTypes;
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private emitNewMessage(message: string) {
    this.buyerTicketService.changeTickets(message);
  }

  public toggleAddOrEditForm() {
    this.isEditing = !this.isEditing;
    this.buyerTicketService.requestTicketTypes(true);
  }

  public removeTicket() {
    if (this.ticket) {
      this.ticketService.deleteTicket(this.ticket.userId, this.ticket.eventId, this.ticket.auxiliaryId).subscribe({
        next: (response: any) => {
        },
        error: (error) => {
        },
        complete: () => {
          this.emitNewMessage('Deleted ticket successfully');
        }
      });
    }
  }
}
