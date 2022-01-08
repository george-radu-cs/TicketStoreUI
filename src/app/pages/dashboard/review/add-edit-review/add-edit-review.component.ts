import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReviewService} from '../../../../services/review.service';
import {Review} from '../../../../interfaces/review';
import {positiveIntegerRegex} from '../../../../shared/utils/validators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-review',
  templateUrl: './add-edit-review.component.html',
  styleUrls: ['./add-edit-review.component.css']
})
export class AddEditReviewComponent implements OnInit, OnChanges {
  @Input() userId!: string;
  @Input() eventId!: string;
  @Output() onReviewChanged: EventEmitter<any> = new EventEmitter();
  public reviewForm!: FormGroup;
  public title: string = 'Add review';
  public reviewData: Review | null = null;
  public isCreatingOrEditing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    public dialogRef: MatDialogRef<AddEditReviewComponent>
  ) {
    this.initForm();
    if (data && data.review) {
      this.reviewData = data.review;
      this.reviewForm.patchValue(data.review);
      this.title = 'Edit review';
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] !== undefined && changes['eventId'] !== undefined) {
      this.initForm();
      this.getUserReview();
    }
  }

  private initForm(): void {
    this.reviewForm = this.formBuilder.group({
      userId: [this.userId, [Validators.required]],
      eventId: [this.eventId, [Validators.required]],
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5), Validators.pattern(positiveIntegerRegex)]],
    });
  }

  get rating(): AbstractControl {
    return this.reviewForm.controls['rating'];
  }

  public emitNewMessage(value: string) {
    this.onReviewChanged.emit(value);
  }

  public toggleAddOrEditForm(): void {
    this.isCreatingOrEditing = !this.isCreatingOrEditing;
  }

  private resetReviewForm(): void {
    this.reviewForm.get('title')?.setValue('');
    this.reviewForm.get('message')?.setValue('');
    this.reviewForm.get('rating')?.setValue(0);
  }

  public getUserReview(): void {
    if (this.userId && this.eventId) {
      this.reviewService.getReviewById(this.userId, this.eventId).subscribe({
        next: (review: Review) => {
          this.reviewData = review; // save the review's data
          this.title = 'Edit review'; // change the title to edit because we will have values in form
          this.reviewForm.patchValue(this.reviewData); // insert the review's data in the form
        },
        error: (error) => {
          this.reviewData = null;
        },
        complete: () => {
        }
      });
    }
  }

  public addReview(): void {
    if (this.reviewForm.valid) {
      this.reviewService.createReview(this.reviewForm.value).subscribe({
        next: (response: any) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
        },
        complete: () => {
          this.emitNewMessage('added-review');
          this.toggleAddOrEditForm();
          this.getUserReview();
        }
      });
    }
  }

  public editReview(): void {
    if (this.reviewForm.valid) {
      this.reviewService.updateReview(this.reviewForm.value).subscribe({
        next: (response: any) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
        },
        complete: () => {
          this.emitNewMessage('updated-review');
          this.toggleAddOrEditForm();
          this.getUserReview();
        }
      });
    }
  }

  public removeReview(): void {
    const review = this.reviewForm.value;
    this.reviewService.deleteReview(review.userId, review.eventId).subscribe({
      next: (response: any) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
      },
      complete: () => {
        this.resetReviewForm();
        this.emitNewMessage('deleted-review');
        this.getUserReview();
      }
    });
  }
}
