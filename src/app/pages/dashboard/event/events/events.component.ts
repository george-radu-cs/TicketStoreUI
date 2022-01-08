import {Component, OnInit} from '@angular/core';
import {User} from '../../../../interfaces/user';
import {DataService} from '../../../../services/data.service';
import {Router} from '@angular/router';
import {Event} from '../../../../interfaces/event';
import {EventService} from '../../../../services/event.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEditEventComponent} from '../add-edit-event/add-edit-event.component';
import {PageEvent} from '@angular/material/paginator';
import {FilterEvents} from '../../../../interfaces/filter-events';
import {limit, snackbarDuration} from '../../../../shared/utils/utils';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public user: User | undefined;
  public events: Event[] = [];
  public fetchedEvents: boolean = false;
  public displayedColumns = ['id', 'name', 'category', 'genre', 'address', 'start-date', 'end-date', 'view', 'edit', 'delete'];
  public length: number = limit;
  public pageSize: number = limit;
  private filterEventsOptions: FilterEvents = {
    limit: limit,
    offset: 0,
  };

  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(u => this.user = u);
    this.getEvents();
  }

  private onChangeEvents(message: string): void {
    this.snackBar.open(message, '', {duration: snackbarDuration});
  }

  public getEvents(pageEvent?: PageEvent) {
    let previousPageIndex = 0;
    let pageIndex = 1;
    if (pageEvent) { // if not the first call set the new offset
      this.filterEventsOptions.offset = pageEvent.pageIndex * limit;
      if (pageEvent.previousPageIndex) {
        previousPageIndex = pageEvent.previousPageIndex + 1;
      }
      pageIndex = pageEvent.pageIndex + 1;
    }
    this.eventService.getEvents(this.filterEventsOptions).subscribe({
        next: (result: Event[]) => {
          this.events = result;
          // if fetched new events
          if (previousPageIndex < pageIndex && pageIndex * limit === this.length) {
            // update the length of the paginator dynamic based on events received
            if (this.events.length < limit) { // no more ref => set the length for paginator to match the number of
              // events fetched until now and stop the user to try to fetch more events
              this.length = this.length - limit + this.events.length;
            } else { // if we got $limit of events than we can try next time to get the same amount
              this.length += limit;
            }
          } else { // if the paginator moved to a smaller index
            let toRemove = (this.length - limit) % limit;
            // if we received less than $limit of events restore the length to a number divisible by $limit
            // else keep the length the same
            toRemove = toRemove !== 0 ? toRemove - limit : 0;
            this.length = this.length - toRemove;
          }
        },
        error: (error) => {
          this.events = [];
          this.fetchedEvents = true;
        },
        complete: () => {
          this.fetchedEvents = true;
        }
      }
    );
  }

  public openModal(event?: Event): void {
    const data = {event}; // copy the event data
    const dialogConfig = new MatDialogConfig();
    // set the width and height based on user's browser window
    dialogConfig.width = window.innerWidth * 0.9 + 'px';
    dialogConfig.height = window.innerHeight * 0.9 + 'px';
    dialogConfig.data = data; // set the data
    const dialogRef = this.dialog.open(AddEditEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.onChangeEvents(result);
        this.getEvents(); // so we fetch the events to have the updated data
      }
    });
  }

  public viewEvent(event: Event): void {
    this.router.navigate([`/dashboard/event-menu/event/${event.id}`]);
  }

  public addEvent(): void {
    if (this.user) {
      this.openModal();
    }
  }

  public editEvent(event: Event): void {
    if (this.user) {
      this.openModal(event);
    }
  }

  public deleteEvent(event: Event): void {
    this.eventService.deleteEvent(event.id).subscribe({
      next: (response: any) => {
      },
      error: (error) => {
      },
      complete: () => {
        this.onChangeEvents('Removed event successfully');
        this.getEvents();
      }
    });
  }

}
