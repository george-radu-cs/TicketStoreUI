import {Component, OnInit} from '@angular/core';
import {LoginUser} from '../../interfaces/login-user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Token} from '../../interfaces/token';
import {HttpErrorResponse} from '@angular/common/http';

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
          this.router.navigate(['/dashboard']);
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
