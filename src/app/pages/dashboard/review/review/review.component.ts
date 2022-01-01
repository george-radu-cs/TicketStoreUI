import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../../interfaces/review';
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review | null = null;
  public faStar = faStar;
  public faStarHalfAlt = faStarHalfAlt;
  private maxRating: number = 5;

  constructor() {
  }

  ngOnInit(): void {
  }

  public formatDate(date: string): string {
    return dayjs(date).format('DD-MMM-YYYY').toString();
  }

  public getNumberOfFilledStars(): number {
    if (this.review) {
      return Math.floor(Number(this.review.rating));
    }
    return 0;
  }

  public getNumberOfEmptyStars(): number {
    if (this.review) {
      return this.maxRating - Math.ceil(Number(this.review.rating));
    }

    return this.maxRating;
  }

  public showHalfStar(): boolean {
    return this.getNumberOfEmptyStars() + this.getNumberOfFilledStars() !== this.maxRating;
  }
}
