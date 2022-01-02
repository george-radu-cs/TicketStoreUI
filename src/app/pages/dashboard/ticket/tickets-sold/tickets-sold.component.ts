import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';
import {User} from '../../../../interfaces/user';
import {DataService} from '../../../../services/data.service';
import {TicketService} from '../../../../services/ticket.service';

@Component({
  selector: 'app-tickets-sold',
  templateUrl: './tickets-sold.component.html',
  styleUrls: ['./tickets-sold.component.css']
})
export class TicketsSoldComponent implements OnInit {
  private user!: User;
  public tickets: Ticket[] = [];
  public fetchedTickets: boolean = false;

  constructor(
    private dataService: DataService,
    private ticketService: TicketService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.dataService.currentUser.subscribe(u => {
      this.user = u; // save the data
      this.getTickets(); // get the user's tickets
    });
  }

  private getTickets() {
    this.ticketService.getTicketsSoldByAnOrganisation(this.user.id).subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
      },
      error: (error) => {
        this.tickets = [];
        this.fetchedTickets = true;
      },
      complete: () => {
        this.fetchedTickets = true;
      }
    });
  }
}
