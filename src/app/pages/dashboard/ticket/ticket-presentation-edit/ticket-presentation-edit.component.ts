import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';
import {TicketService} from '../../../../services/ticket.service';

@Component({
  selector: 'app-ticket-presentation-edit',
  templateUrl: './ticket-presentation-edit.component.html',
  styleUrls: ['./ticket-presentation-edit.component.css']
})
export class TicketPresentationEditComponent implements OnInit {
  @Input() ticket: Ticket | null = null;
  @Output() onTicketChanged: EventEmitter<any> = new EventEmitter();
  public isEditing = false;

  constructor(
    private ticketService: TicketService,
  ) {
  }

  ngOnInit(): void {
  }

  public toggleAddOrEditForm() {
    this.isEditing = !this.isEditing;
  }

  public emitNewMessage(value: string) {
    this.onTicketChanged.emit(value);
  }

  public removeTicket() {
    if (this.ticket) {
      this.ticketService.deleteTicket(this.ticket.userId, this.ticket.eventId, this.ticket.auxiliaryId).subscribe({
        next: (response: any) => {
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.emitNewMessage('deleted-ticket')
        }
      });
    }
  }
}
