import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl(),
    surname: new FormControl(),
    telNum: new FormControl('', [Validators.required]),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router){}

  signUp(){
    if(this.signUpForm.valid) {
      alert("An activation mail has been sent.\nTo continue click the link in mail!");
      this.router.navigate(['/main']);
    }
  }

}
