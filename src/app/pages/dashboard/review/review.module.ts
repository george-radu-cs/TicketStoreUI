import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review/review.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';


@NgModule({
    declarations: [
        ReviewComponent
    ],
  exports: [
    ReviewComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    FontAwesomeTestingModule
  ]
})
export class ReviewModule { }
