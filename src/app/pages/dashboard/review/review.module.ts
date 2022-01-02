import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReviewRoutingModule} from './review-routing.module';
import {ReviewComponent} from './review/review.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {AddEditReviewComponent} from './add-edit-review/add-edit-review.component';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {NgxStarRatingModule} from 'ngx-star-rating';
import {MyReviewsComponent} from './my-reviews/my-reviews.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EventsReviewsComponent} from './events-reviews/events-reviews.component';


@NgModule({
  declarations: [
    ReviewComponent,
    AddEditReviewComponent,
    MyReviewsComponent,
    EventsReviewsComponent
  ],
  exports: [
    ReviewComponent,
    ReviewComponent,
    AddEditReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    FontAwesomeTestingModule,
    MatIconModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxStarRatingModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: null}
  ]
})
export class ReviewModule {
}
