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
          localStorage.setItem('user', JSON.stringify(result));
        
          this.authService.setUser();
          this.router.navigate(['/main']);

        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error);
            console.log('**********************');
            console.log(error.error);
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
