import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private router: Router, private authService: AuthService) {}

  changePwForm = new FormGroup({
    password: new FormControl('',),
    password1: new FormControl('',),
    password2: new FormControl('',), 
  });

  hasError: number = 0;

  changePw(): void {
    this.hasError = 0;
    const changePwVal = {
      password: this.changePwForm.value.password,
      password1: this.changePwForm.value.password1,
      password2: this.changePwForm.value.password2,
    };
    if (this.changePwForm.valid) {
      if (changePwVal.password1 == changePwVal.password2){
        const value = {
          old_password: changePwVal.password,
          new_password: changePwVal.password1,
        }
        this.authService.changePw(value).subscribe({
        next: (result) => {
            alert("Password successfuly updated");
            this.router.navigate(['/profile']);
        },
        error: (error) => {
            if(error.status == 400) {
              this.hasError = 1;
            } else if (error.status == 404){
              this.hasError = 2;
            }
        },
        });
     } else {
      this.hasError = 2;
     }
    }
  }
}
