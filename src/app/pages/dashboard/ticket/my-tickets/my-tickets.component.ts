import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../../../services/ticket.service';
import {User} from '../../../../interfaces/user';
import {Ticket} from '../../../../interfaces/ticket';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
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
    this.ticketService.getBuyerTickets(this.user.id).subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
      },
      error: (error) => {
        this.tickets = [];
        console.error(error);
      },
      complete: () => {
        this.fetchedTickets =true;
      }
    });
  }
}
