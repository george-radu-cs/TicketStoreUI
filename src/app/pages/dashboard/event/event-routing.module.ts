import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsComponent} from './events/events.component';
import {EventComponent} from './event/event.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'event/:id',
    component: EventComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
