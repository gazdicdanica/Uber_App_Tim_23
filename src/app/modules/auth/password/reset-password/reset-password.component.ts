import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/services/user/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPwGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  onContinueResetPwClick(): void {
    if(this.resetPwGroup.valid) {
      this.userService.sendResetCode(this.resetPwGroup.value.email!).subscribe({
        next: (result) => {
            this.authService.logout();
            this.router.navigate(['/resetPwViaCode']);
            localStorage.setItem('userEmail', this.resetPwGroup.value.email!)
            alert("Check Your Email Address For A Unique Code");
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

}
