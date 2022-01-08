import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventRoutingModule} from './event-routing.module';
import {EventsComponent} from './events/events.component';
import {EventComponent} from './event/event.component';
import {MaterialModule} from '../../material/material.module';
import {EventGuestComponent} from './event-guest/event-guest.component';
import {ReviewModule} from '../review/review.module';
import {AddEditEventComponent} from './add-edit-event/add-edit-event.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TicketModule} from '../ticket/ticket.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    EventsComponent,
    EventComponent,
    EventGuestComponent,
    AddEditEventComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MaterialModule,
    ReviewModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TicketModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
  ]
})
export class EventModule {
}
