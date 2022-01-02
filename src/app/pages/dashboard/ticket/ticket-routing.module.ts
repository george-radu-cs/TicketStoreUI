import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTicketsComponent} from './my-tickets/my-tickets.component';
import {TicketsSoldComponent} from './tickets-sold/tickets-sold.component';
import {IsBuyerGuard} from '../../../guards/is-buyer.guard';
import {IsOrganizerGuard} from '../../../guards/is-organizer.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-tickets'
  },
  {
    path: 'my-tickets',
    canActivate: [IsBuyerGuard],
    component: MyTicketsComponent
  },
  {
    path: 'tickets-sold',
    canActivate: [IsOrganizerGuard],
    component: TicketsSoldComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
