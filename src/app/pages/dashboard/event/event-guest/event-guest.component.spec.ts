import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGuestComponent } from './event-guest.component';

describe('EventGuestComponent', () => {
  let component: EventGuestComponent;
  let fixture: ComponentFixture<EventGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
