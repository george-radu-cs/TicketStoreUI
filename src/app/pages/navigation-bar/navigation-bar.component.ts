import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarMenusService} from '../../services/navbar-menus.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  subscription: any;
  isLoggedIn: boolean = false;
  menus: { link: string, label: string }[] = [];

  constructor(
    private authService: AuthService,
    private navbarService: NavbarMenusService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(data => {
      this.isLoggedIn = data;
      this.updateMenus();
    });
    this.updateMenus(); // on init
  }

  private updateMenus():void {
    const role = this.authService.getRole();
    this.menus = this.navbarService.updateNavbar(role);
  }

  public logout(): void {
    this.authService.logout(); // call the logout method in authservice
    this.router.navigate(['auth/login']); // redirect
  }
}
