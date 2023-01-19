import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { confirmPasswordValidator } from '../confirm-password.directive';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {

  responseError: boolean = false;

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    telNum: new FormControl('', [Validators.required, Validators.pattern("^(\\+381)?(0)?6(([0-6]|[8-9])\\d{7}|(77|78)\\d{6}){1}$")]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {validators: confirmPasswordValidator});


  constructor(private authService: AuthService, private router: Router){}

  signUp(){
    if(this.signUpForm.valid) {
      this.authService.signup(this.signUpForm.value)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/main']);
          alert("An activation mail has been sent.\nTo continue click the link in mail!");
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.responseError = true;
          }
        },
      });
    
    }
  }




}
