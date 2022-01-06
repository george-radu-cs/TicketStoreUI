import {Component, OnInit} from '@angular/core';
import {Review} from '../../../../interfaces/review';
import {User} from '../../../../interfaces/user';
import {DataService} from '../../../../services/data.service';
import {ReviewService} from '../../../../services/review.service';

@Component({
  selector: 'app-events-reviews',
  templateUrl: './events-reviews.component.html',
  styleUrls: ['./events-reviews.component.css']
})
export class EventsReviewsComponent implements OnInit {
  public organizer: User | undefined;
  public reviews: Review[] = [];
  public fetchedReviews: boolean = false;
  public displayedColumns = ['event-name', 'user', 'title', 'rating', 'message', 'date'];

  constructor(
    private dataService: DataService,
    private reviewService: ReviewService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(u => {
      this.organizer = u;
      this.getOrganizerReviews();
    });
  }

  private getOrganizerReviews() {
    if (this.organizer !== undefined && this.organizer.id) { // organizer is not undefined => we can use it
      this.reviewService.getOrganizerReviews(this.organizer.id).subscribe({
        next: (result: Review[]) => {
          this.reviews = result;
        },
        error: (error) => {
          this.reviews = [];
          this.fetchedReviews = true;
        },
        complete: () => {
          this.fetchedReviews = true;
        }
      });
    } else { // if we didn't get the organizer we can't get the reviews either
      this.fetchedReviews = true;
    }
  }
}
