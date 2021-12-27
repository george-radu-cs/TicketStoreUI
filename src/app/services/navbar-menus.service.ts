import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarMenusService {
  private AdminMenus = [
    {link: 'dashboard/event-menu', label: 'Events'},
    {link: 'dashboard/review-menu', label: 'Reviews'},
    {link: 'dashboard/ticket-menu', label: 'Tickets'},
  ];

  private BuyerMenus = [
    {link: 'dashboard/event-menu', label: 'Events'},
    {link: 'dashboard/review-menu', label: 'My Reviews'},
    {link: 'dashboard/ticket-menu', label: 'My Tickets'},
  ];

  private OrganizerMenus = [
    {link: 'dashboard/event-menu', label: 'My Events'},
    {link: 'dashboard/review-menu', label: 'Reviews'},
    {link: 'dashboard/ticket-menu', label: 'Tickets'},
  ];


  constructor() {
  }

  public updateNavbar = (role: string) => {
    switch (role) {
      case 'Admin':
        return this.AdminMenus;
      case 'Buyer':
        return this.BuyerMenus;
      case 'Organizer':
        return this.OrganizerMenus;
      default:
        return [];
    }
  };

}
