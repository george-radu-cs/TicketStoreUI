import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarMenusService {
  private AdminMenus = [
    {link: 'dashboard/event-menu', label: 'Events'},
    {link: 'dashboard/review-menu/my-reviews', label: 'My Reviews'},
    {link: 'dashboard/review-menu/events-reviews', label: 'Events Reviews'},
    {link: 'dashboard/ticket-menu/my-tickets', label: 'My Tickets'},
    {link: 'dashboard/ticket-menu/tickets-sold', label: 'Tickets Sold'},
  ];

  private BuyerMenus = [
    {link: 'dashboard/event-menu', label: 'Events'},
    {link: 'dashboard/review-menu/my-reviews', label: 'My Reviews'},
    {link: 'dashboard/ticket-menu/my-tickets', label: 'My Tickets'},
  ];

  private OrganizerMenus = [
    {link: 'dashboard/event-menu', label: 'My Events'},
    {link: 'dashboard/review-menu/events-reviews', label: 'Reviews'},
    {link: 'dashboard/ticket-menu/tickets-sold', label: 'Tickets'},
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
