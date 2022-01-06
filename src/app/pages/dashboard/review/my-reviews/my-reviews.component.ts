import {Component, OnInit} from '@angular/core';
import {User} from '../../../../interfaces/user';
import {Review} from '../../../../interfaces/review';
import {DataService} from '../../../../services/data.service';
import {ReviewService} from '../../../../services/review.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEditReviewComponent} from '../add-edit-review/add-edit-review.component';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {
  public user: User | undefined;
  public reviews: Review[] = [];
  public fetchedReviews: boolean = false;
  public displayedColumns = ['event-name', 'title', 'rating', 'message', 'date', 'view', 'delete'];

  constructor(
    private dataService: DataService,
    private reviewService: ReviewService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(u => {
      this.user = u;
      this.getMyReviews();
    });
  }

  public formatDescription(message: string): string {
    return message.substring(0, 200) + (message.length > 200 ? '...' : '');
  }

  public openModal(review?: Review): void {
    const data = {review};
    const dialogConfig = new MatDialogConfig();
    // set the width and height based on user's browser window
    dialogConfig.width = window.innerWidth * 0.5 + 'px';
    dialogConfig.height = window.innerHeight * 0.4 + 'px';
    dialogConfig.data = data; // set the data
    const dialogRef = this.dialog.open(AddEditReviewComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) { // if result is true the create or update was successfully
        this.getMyReviews(); // so we fetch the events to have the updated data
      }
    });
  }

  private getMyReviews(): void {
    if (this.user !== undefined && this.user.id) { // user is not undefined => we can use it
      this.reviewService.getUserReviews(this.user.id).subscribe({
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
    } else { // if we didn't get the user we can't get reviews either
      this.fetchedReviews = true;
    }
  }

  public viewReview(review: Review): void {
    this.openModal(review);
  }

  public deleteReview(review: Review): void {
    this.reviewService.deleteReview(review.userId, review.eventId).subscribe({
      next: (response: any) => {
      },
      error: (error) => {},
      complete: () => {
        this.getMyReviews();
      }
    });
  }
}
