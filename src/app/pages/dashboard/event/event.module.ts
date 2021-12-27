import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventRoutingModule} from './event-routing.module';
import {EventsComponent} from './events/events.component';
import {EventComponent} from './event/event.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [
    EventsComponent,
    EventComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MaterialModule,
  ]
})
export class EventModule {
}
