import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import {emailRegex, nameRegex, phoneRegex} from '../../../shared/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public roles: any = ['Buyer', 'Organizer'];
  public phonePrefixes: any = ['+1', '+40'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(21),
        Validators.pattern(nameRegex),
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(21),
        Validators.pattern(nameRegex),
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(emailRegex),
      ]],
      phonePrefix: ['', [Validators.required]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(phoneRegex)
      ]],
      age: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(200)
      ]],
      isStudent: [false, [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      role: ['', [Validators.required]],
    });
  }

  // getters
  get firstName(): AbstractControl {
    return this.registerForm.controls['firstName'];
  }

  get lastName(): AbstractControl {
    return this.registerForm.controls['lastName'];
  }

  get email(): AbstractControl {
    return this.registerForm.controls['email'];
  }

  get phonePrefix(): AbstractControl {
    return this.registerForm.controls['phonePrefix'];
  }

  get phoneNumber(): AbstractControl {
    return this.registerForm.controls['phoneNumber'];
  }

  get age(): AbstractControl {
    return this.registerForm.controls['age'];
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }

  get role(): AbstractControl {
    return this.registerForm.controls['role'];
  }

  // created for convenience for easier access of the form fields
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  public isControlValid(control: string): boolean {
    return !(this.f[control].invalid && (this.f[control].dirty && this.f[control].touched));
  }

  doRegister() {
    if (this.registerForm.valid) { // if the register form is valid make the call to the api
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.router.navigate(['login']);
        },
      });
    } else { // if the register form is invalid then alert the user to complete the form
      window.alert('Please complete the form!');
    }
  }
}
