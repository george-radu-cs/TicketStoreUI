import {Component, Input, OnInit} from '@angular/core';
import {Guest} from '../../../../interfaces/guest';

@Component({
  selector: 'app-event-guest',
  templateUrl: './event-guest.component.html',
  styleUrls: ['./event-guest.component.css']
})
export class EventGuestComponent implements OnInit {
  @Input() guest: Guest | null = null;
  @Input() number: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
