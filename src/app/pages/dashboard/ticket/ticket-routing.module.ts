import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyTicketsComponent} from './my-tickets/my-tickets.component';
import {TicketsSoldComponent} from './tickets-sold/tickets-sold.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-tickets'
  },
  {
    path: 'my-tickets',
    component: MyTicketsComponent
  },
  {
    path: 'tickets-sold',
    component: TicketsSoldComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
