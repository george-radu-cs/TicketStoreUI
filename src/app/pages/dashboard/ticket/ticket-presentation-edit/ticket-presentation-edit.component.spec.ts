import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPresentationEditComponent } from './ticket-presentation-edit.component';

describe('TicketPresentationEditComponent', () => {
  let component: TicketPresentationEditComponent;
  let fixture: ComponentFixture<TicketPresentationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPresentationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPresentationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
