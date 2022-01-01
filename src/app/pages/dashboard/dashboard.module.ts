import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EventModule} from './event/event.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    EventModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
