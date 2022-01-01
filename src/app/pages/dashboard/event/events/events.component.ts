import {Component, OnInit} from '@angular/core';
import {User} from '../../../../interfaces/user';
import {DataService} from '../../../../services/data.service';
import {Router} from '@angular/router';
import {Event} from '../../../../interfaces/event';
import {EventService} from '../../../../services/event.service';
import {HttpErrorResponse} from '@angular/common/http';
import * as dayjs from 'dayjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEditEventComponent} from '../add-edit-event/add-edit-event.component';

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
    public dialog: MatDialog,
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

  public formatDate(date: string): string {
    return dayjs(date).format('DD-MMM-YYYY').toString();
  }

  public openModal(event?: Event): void {
    const data = {event}; // copy the event data
    const dialogConfig = new MatDialogConfig();
    // set the width and height based on user's browser window
    dialogConfig.width = window.innerWidth * 0.9 + 'px';
    dialogConfig.height = window.innerHeight * 0.9 + 'px';
    dialogConfig.data = data; // set the data
    const dialogRef = this.dialog.open(AddEditEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) { // if result is true the create or update was successfully
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
        console.log(response);
      },
      error: (error: HttpErrorResponse) => console.error(error.error),
      complete: () => {
        this.getEvents();
      }
    });
  }

}
