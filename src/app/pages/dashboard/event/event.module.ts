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
  ]
})
export class EventModule {
}
