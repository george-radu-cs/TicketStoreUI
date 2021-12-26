import { TestBed } from '@angular/core/testing';

import { IsBuyerGuard } from './is-buyer.guard';

describe('IsBuyerGuard', () => {
  let guard: IsBuyerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsBuyerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
