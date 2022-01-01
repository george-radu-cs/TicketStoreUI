import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Token} from 'src/app/interfaces/token';
import {LoginUser} from 'src/app/interfaces/login-user';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isDisabled: boolean = false;
  public loginUser: LoginUser = {
    email: '',
    password: '',
  };

  public error: string | boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  doLogin() {
    const isFormValid = this.validateEmail(this.loginUser.email) && this.loginUser.password != '';
    if (isFormValid) {
      this.authService.login(this.loginUser).subscribe({
        next: (response: Token) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
        },
        error: (_: HttpErrorResponse) => this.error = 'Wrong email or password!',
        complete: () => {
          this.authService.loginSuccessfully(); // login successfully
          this.router.navigate(['/dashboard']); // redirect
        },
      });
    }

    if (this.loginUser.email == '') {
      this.error = 'Email is required';
    } else if (!this.validateEmail(this.loginUser.email)) {
      this.error = 'Email is invalid!';
    } else if (this.loginUser.password == '') {
      this.error = 'Password is required!';
    }
  }

  validateEmail(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(String(email).toLowerCase());
  }
}
