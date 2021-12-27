import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import {Event} from '../../../../interfaces/event';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public id: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getEvent();
      }
    });
  }

  public getEvent(): void {
    this.eventService.getEventById(this.id).subscribe({
      next: (event: Event) => {
        console.log(event);
      },
      error: (error: HttpErrorResponse) => console.error(error.error),
      complete: () => {
      },
    });
  }
}
