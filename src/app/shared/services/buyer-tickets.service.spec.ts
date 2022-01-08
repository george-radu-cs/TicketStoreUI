import { TestBed } from '@angular/core/testing';

import { BuyerTicketsService } from './buyer-tickets.service';

describe('BuyerTicketsService', () => {
  let service: BuyerTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
