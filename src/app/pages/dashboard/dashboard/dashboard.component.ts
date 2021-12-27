import {Component, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | undefined;

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(u => this.user = u);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }
}
