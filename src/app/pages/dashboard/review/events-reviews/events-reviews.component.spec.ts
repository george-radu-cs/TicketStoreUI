import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsReviewsComponent } from './events-reviews.component';

describe('EventsReviewsComponent', () => {
  let component: EventsReviewsComponent;
  let fixture: ComponentFixture<EventsReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
