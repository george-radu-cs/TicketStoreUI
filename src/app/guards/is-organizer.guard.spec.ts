import { TestBed } from '@angular/core/testing';

import { IsOrganizerGuard } from './is-organizer.guard';

describe('IsOrganizerGuard', () => {
  let guard: IsOrganizerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsOrganizerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
