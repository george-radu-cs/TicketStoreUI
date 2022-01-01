import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Review} from '../../../../interfaces/review';
import * as dayjs from 'dayjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnChanges {
  @Input() review: Review | null = null;
  @Input() index: number = 0;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      rating: [{value: this.review ? Number(this.review.rating) : 0, disabled: true}]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['review'] !== undefined) {
      this.form = this.formBuilder.group({
        rating: [{value: this.review ? Number(this.review.rating) : 0, disabled: true}]
      });
    }
  }

  public formatDate(date: string): string {
    return dayjs(date.toLocaleLowerCase()).format('DD-MMM-YYYY').toString();
  }

}
