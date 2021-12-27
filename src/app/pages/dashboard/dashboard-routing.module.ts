import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'event-menu',
        loadChildren: () => import('./event/event.module').then(m => m.EventModule)
      },
      {
        path: 'ticket-menu',
        loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
      },
      {
        path: 'review-menu',
        loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
