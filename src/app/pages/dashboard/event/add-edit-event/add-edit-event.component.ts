import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EventService} from '../../../../services/event.service';
import {selectOption} from '../../../../interfaces/select-option';
import {Guest} from '../../../../interfaces/guest';
import {User} from '../../../../interfaces/user';
import {DataService} from '../../../../services/data.service';
import {positiveFloatRegex, nameRegex, positiveIntegerRegex} from '../../../../shared/utils/validators';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css']
})
export class AddEditEventComponent implements OnInit {
  public eventForm!: FormGroup;
  public title: string = '';
  private organizer: User | undefined;

  public currencies: selectOption[] = [
    {value: 'USD', viewValue: '$'},
    {value: 'EUR', viewValue: '€'},
    {value: 'GBT', viewValue: '£'},
    {value: 'RON', viewValue: 'lei'},
  ];
  public geocodeAccuracies: selectOption[] = [
    {value: 'block', viewValue: 'Block'},
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private eventService: EventService,
    public dialogRef: MatDialogRef<AddEditEventComponent>,
  ) {
    this.initForm();
    if (data && data.event) {
      this.title = 'Edit Event';
      this.eventForm.patchValue(this.data.event);
      this.data.event.guests.forEach((guest: Guest) => {
        this.guests.push(this.formBuilder.group({
          firstName: [guest.firstName, [Validators.required, Validators.pattern(nameRegex)]],
          lastName: [guest.lastName, [Validators.required, Validators.pattern(nameRegex)]],
          sceneName: [guest.sceneName, [Validators.required]],
          description: [guest.description, [Validators.required]],
          category: [guest.category, [Validators.required]],
          genre: [guest.genre, [Validators.required]],
          age: [guest.age, [Validators.required, Validators.min(1), Validators.max(200)]],
          eventId: [guest.eventId, [Validators.required]],
        }));
      });
    } else {
      this.title = 'Add Event';
    }
  }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(u => this.organizer = u);
  }

  private initForm(): void {
    this.eventForm = this.formBuilder.group({
      id: ['', []],
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: [undefined, [Validators.required]],
      endDate: [undefined, [Validators.required]],
      category: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      organizerId: ['', [Validators.required]],
      location: this.formBuilder.group({ // should be changed, for now let it be
        buildingName: ['', [Validators.required]],
        addressFullName: ['', [Validators.required]],
        locality: ['', [Validators.required]],
        state: ['', [Validators.required]],
        stateCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        countryCode: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        latitude: [0, [Validators.required]],
        longitude: [0, [Validators.required]],
        geocodeAccuracy: ['', [Validators.required]],
      }),
      ticketTypes: this.formBuilder.group({
        numberStandardTickets: [0, [Validators.required, Validators.min(1), Validators.pattern(positiveIntegerRegex)]],
        priceStandardTicket: ['', [Validators.required, Validators.pattern(positiveFloatRegex)]],
        numberVipTickets: [0, [Validators.required, Validators.min(0), Validators.pattern(positiveIntegerRegex)]],
        priceVipTicket: ['', [Validators.required, Validators.pattern(positiveFloatRegex)]],
        priceChildTicket: ['', [Validators.pattern(positiveFloatRegex)]],
        priceStudentTicket: ['', [Validators.pattern(positiveFloatRegex)]],
        priceCurrency: ['', [Validators.required]],
      }),
      guests: new FormArray([]),
    });
  }

  // getters
  get guests() {
    return this.eventForm.controls['guests'] as FormArray;
  }

  public getFormControl(control: string, groupKey: string = ''): AbstractControl {
    if (groupKey !== '') {
      return (<FormGroup>this.eventForm.controls[groupKey]).controls[control];
    }
    return this.eventForm.controls[control];
  }

  public getFormControls(): { [key: string]: AbstractControl } {
    return this.eventForm.controls;
  }

  public getSubformControls(groupKey: string): { [key: string]: AbstractControl } {
    return (<FormGroup>this.eventForm.controls[groupKey]).controls;
  }

  public isControlValid(control: string, groupKey: string = ''): boolean {
    if (groupKey !== '') {
      return !(this.getSubformControls(groupKey)[control].invalid
        && (this.getSubformControls(groupKey)[control].dirty && this.getSubformControls(groupKey)[control].touched));
    }
    return !(this.getFormControls()[control].invalid
      && (this.getFormControls()[control].dirty && this.getFormControls()[control].touched));
  }

  // add new form group for a new guest
  public addGuest(): void {
    const eventId = this.data && this.data.event ? this.data.event.id : '';
    const guestForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(nameRegex)]],
      sceneName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(200), Validators.pattern(positiveIntegerRegex)]],
      eventId: [eventId],
    });
    this.guests.push(guestForm);
  }

  // remove a guest's form group by indesx
  public removeGuest(guestIndex: number): void {
    this.guests.removeAt(guestIndex);
  }

  public addEvent(): void {
    // set organizerId
    const eventToCreate = this.eventForm.value;
    eventToCreate.organizerId = this.organizer ? this.organizer.id : '';
    if (this.eventForm.valid) {
      this.eventService.createEvent(eventToCreate).subscribe({
        next: (result: any) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
        }
      });
    }
  }

  public editEvent(): void {
    if (this.eventForm.valid) {
      this.eventService.editEvent(this.eventForm.value).subscribe({
        next: (result: any) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
        }
      });
    }
  }
}
