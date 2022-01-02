import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerEventTicketsComponent } from './buyer-event-tickets.component';

describe('BuyerEventTicketsComponent', () => {
  let component: BuyerEventTicketsComponent;
  let fixture: ComponentFixture<BuyerEventTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerEventTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerEventTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
