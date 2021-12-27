import {Component, OnInit} from '@angular/core';
import {User} from '../../../../interfaces/user';
import {DataService} from '../../../../services/data.service';
import {Router} from '@angular/router';
import {Event} from '../../../../interfaces/event';
import {EventService} from '../../../../services/event.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public user: User | undefined;
  public events: Event[] = [];
  public displayedColumns = ['id', 'name', 'category', 'genre', 'address', 'start-date', 'end-date', 'view', 'edit', 'delete'];

  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(u => this.user = u);
    this.getEvents();
  }

  private getEvents() {
    this.eventService.getEvents().subscribe({
        next: (result: Event[]) => {
          this.events = result;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
        }
      }
    );
  }

  addEvent(): void {

  }

  viewEvent(event: Event): void {
    this.router.navigate([`/dashboard/event-menu/event/${event.id}`]);
  }

  editEvent(event: Event): void {
  }

  deleteEvent(event: Event): void {
    this.eventService.deleteEvent(event.id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => console.error(error.error),
      complete: () => {
        this.getEvents();
      }
    });
  }

}
