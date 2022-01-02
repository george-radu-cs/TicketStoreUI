import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ticket} from '../../../../interfaces/ticket';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketService} from '../../../../services/ticket.service';
import {selectOption} from '../../../../interfaces/select-option';
import {EventService} from '../../../../services/event.service';
import {Event} from '../../../../interfaces/event';
import {TicketTypes} from '../../../../interfaces/ticket-types';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.css']
})
export class AddEditTicketComponent implements OnInit, OnChanges {
  @Input() ticket!: Ticket;
  @Input() userId!: string;
  @Input() eventId!: string;
  @Output() onTicketChanged: EventEmitter<any> = new EventEmitter();

  private eventTicketTypes!: TicketTypes;
  public ticketForm!: FormGroup;
  public title: string = 'Buy ticket';

  public ticketTypes: selectOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private ticketService: TicketService,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] !== undefined || changes['eventId'] !== undefined) {
      if (this.userId !== '' && this.eventId !== '') {
        this.initForm();
        this.getEvent();
      }
    }
    if (changes['ticket'] !== undefined) {
      this.title = 'Edit ticket';
      this.setEditValues();
    }
  }

  private initForm(): void {
    this.ticketForm = this.formBuilder.group({
      userId: [this.userId, [Validators.required]],
      eventId: [this.eventId, [Validators.required]],
      auxiliaryId: [''],
      ticketType: ['', [Validators.required]],
      price: ['', Validators.required],
      priceCurrency: ['', [Validators.required]],
    });
  }

  private setEditValues(): void {
    if (this.ticket) {
      this.ticketForm = this.formBuilder.group({
        userId: [this.ticket.userId, [Validators.required]],
        eventId: [this.ticket.eventId, [Validators.required]],
        auxiliaryId: [this.ticket.auxiliaryId, [Validators.required]],
        ticketType: [this.ticket.ticketType, [Validators.required]],
        price: [this.ticket.price, Validators.required],
        priceCurrency: [this.ticket.priceCurrency, [Validators.required]],
      });
    }
  }

  private createNewTicketTypes(): void {
    this.ticketTypes.push(
      {value: 'STANDARD', viewValue: 'Standard'},
      {value: 'VIP', viewValue: 'Vip'},
    );
    if (this.eventTicketTypes.priceStudentTicket !== '0') {
      this.ticketTypes.push({value: 'STUDENT', viewValue: 'Student'});
    }
    if (this.eventTicketTypes.priceChildTicket !== '0') {
      this.ticketTypes.push({value: 'CHILD', viewValue: 'Child'});
    }
  }

  private syncInputs(): void {
    // set the sync between form controls
    this.ticketForm.get('ticketType')?.valueChanges.subscribe(ticketTypeValue => {
      switch (ticketTypeValue) {
        case 'STANDARD':
          this.ticketForm.get('price')?.setValue(this.eventTicketTypes.priceStandardTicket);
          break;
        case 'VIP':
          this.ticketForm.get('price')?.setValue(this.eventTicketTypes.priceVipTicket);
          break;
        case 'STUDENT':
          this.ticketForm.get('price')?.setValue(this.eventTicketTypes.priceStudentTicket);
          break;
        case 'CHILD':
          this.ticketForm.get('price')?.setValue(this.eventTicketTypes.priceChildTicket);
          break;
        default:
          this.ticketForm.get('price')?.setValue('');
          break;
      }
      // set the price currency
      this.ticketForm.get('priceCurrency')?.setValue(this.eventTicketTypes.priceCurrency);
    });
  }

  public emitNewMessage(value: string) {
    this.onTicketChanged.emit(value);
  }

  public addTicket(): void {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value).subscribe({
        next: (response: any) => {
        },
        error: (error) => {

        },
        complete: () => {
          this.emitNewMessage('bought-ticket');
        }
      });
    }
  }

  public editTicket(): void {
    if (this.ticketForm.valid && this.ticketForm.get('auxiliaryId')?.value !== '') {
      this.ticketService.updateTicket(this.ticketForm.value).subscribe({
        next: (response: any) => {
        },
        error: (error) => {

        },
        complete: () => {
          this.emitNewMessage('edited-ticket');
        }
      });
    }
  }

  public getEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event: Event) => {
        this.eventTicketTypes = event.ticketTypes;
      },
      error: (error) => {},
      complete: () => {
        this.createNewTicketTypes();
        this.syncInputs();
      },
    });
  }
}
