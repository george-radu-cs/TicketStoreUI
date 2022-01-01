import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyReviewsComponent} from './my-reviews/my-reviews.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-reviews',
  },
  {
    path: 'my-reviews',
    component: MyReviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {
}
