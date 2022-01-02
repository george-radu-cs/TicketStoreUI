import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket: Ticket | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  public formatDate(date: string): string {
    return dayjs(date.toLocaleLowerCase()).format('DD-MMM-YYYY').toString();
  }
}
