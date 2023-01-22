import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/services/user/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-change-pw-input-code',
  templateUrl: './change-pw-input-code.component.html',
  styleUrls: ['./change-pw-input-code.component.css']
})
export class ChangePwInputCodeComponent {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  resetPassword = new FormGroup ({
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  resetPasswordWithCode(): void {
    if (this.resetPassword.valid){
      const val = {
        code: this.resetPassword.value.code,
        password: this.resetPassword.value.password,
        email: localStorage.getItem('userEmail'),
      }
      this.userService.resetPassword(val).subscribe({
        next: (result) => {
          console.log(result);
          if(result.status == 200) {
            this.authService.logout();
            this.router.navigate(['/main']);
            alert("Password Successfully Updated");
          }
        },
        error: (error) => {
          console.log(error);
          if(error.status == 200) {
            this.authService.logout();
            this.router.navigate(['/main']);
            alert("Password Successfully Updated");
          }
        }
      });
  }
  }

}
