import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/enviroments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    error: new FormControl(''),
  });
  hasError: number = 0;

  login(): void {
    this.hasError = 0;
    const loginVal = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    if (this.loginForm.valid) {
      this.authService.login(loginVal).subscribe({
        next: (result) => {
          let accessToken = JSON.stringify(result).split(",")[0] + "}";
          let refreshToken = "{" + JSON.stringify(result).split(",")[1];

          localStorage.setItem('user', accessToken);
          localStorage.setItem('email', loginVal.email!);
          localStorage.setItem('refresh', refreshToken);
          
          console.log("access na loginu:", localStorage.getItem('user'));
          console.log("refresh na loginu:", localStorage.getItem('refresh'));
          
          this.authService.setUser();
          this.router.navigate(['/']);

        },
        error: (error) => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if(error.status == 500){
              this.hasError = 1;
            } else if (error.status == 400) {
              this.hasError = 2;
            } else if (error.status == 404) {
              this.hasError = 3;
            }
          }
        },
      });
    }
  }
}
