import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsSoldComponent } from './tickets-sold.component';

describe('TicketsSoldComponent', () => {
  let component: TicketsSoldComponent;
  let fixture: ComponentFixture<TicketsSoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsSoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
