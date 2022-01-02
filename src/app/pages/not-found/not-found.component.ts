import {Component, OnInit} from '@angular/core';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  public faExclamationTriangle = faExclamationTriangle;

  constructor() {
  }

  ngOnInit(): void {
  }

}
