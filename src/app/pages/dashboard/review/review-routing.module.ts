import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyReviewsComponent} from './my-reviews/my-reviews.component';
import {EventsReviewsComponent} from './events-reviews/events-reviews.component';
import {IsBuyerGuard} from '../../../guards/is-buyer.guard';
import {IsOrganizerGuard} from '../../../guards/is-organizer.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-reviews',
  },
  {
    path: 'my-reviews',
    canActivate: [IsBuyerGuard],
    component: MyReviewsComponent,
  },
  {
    path: 'events-reviews',
    canActivate: [IsOrganizerGuard],
    component: EventsReviewsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {
}
