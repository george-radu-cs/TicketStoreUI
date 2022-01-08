import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket/ticket.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { TicketsSoldComponent } from './tickets-sold/tickets-sold.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AddEditTicketComponent } from './add-edit-ticket/add-edit-ticket.component';
import { BuyerEventTicketsComponent } from './buyer-event-tickets/buyer-event-tickets.component';
import { TicketPresentationEditComponent } from './ticket-presentation-edit/ticket-presentation-edit.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    TicketComponent,
    MyTicketsComponent,
    TicketsSoldComponent,
    TicketsComponent,
    AddEditTicketComponent,
    BuyerEventTicketsComponent,
    TicketPresentationEditComponent,
  ],
  exports: [
    TicketsComponent,
    TicketsComponent,
    BuyerEventTicketsComponent
  ],
    imports: [
        CommonModule,
        TicketRoutingModule,
        MatProgressSpinnerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule
    ]
})
export class TicketModule { }
