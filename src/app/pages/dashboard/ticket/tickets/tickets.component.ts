import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @Input() tickets: Ticket[] = [];
  public displayedColumns = ['event-name', 'ticket-type', 'price', 'bought-time'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
