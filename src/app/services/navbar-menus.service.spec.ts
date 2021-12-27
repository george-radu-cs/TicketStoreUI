import { TestBed } from '@angular/core/testing';

import { NavbarMenusService } from './navbar-menus.service';

describe('NavbarMenusService', () => {
  let service: NavbarMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
