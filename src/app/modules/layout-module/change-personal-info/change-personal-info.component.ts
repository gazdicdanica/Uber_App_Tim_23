import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/user-model';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-change-personal-info',
  templateUrl: './change-personal-info.component.html',
  styleUrls: ['./change-personal-info.component.css']
})
export class ChangePersonalInfoComponent implements OnInit {

  data!: User;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getUserData();
  }

  profileForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
  });

  updateUser(): void {
    const saveData = {
      name: this.profileForm.value.name,
      surname: this.profileForm.value.surname,
      profilePicture: this.data.profilePicture,
      email: this.data.email,
      address: this.profileForm.value.address,
      telephoneNumber: this.profileForm.value.phone,
    };
    if (this.profileForm.valid) {

      this.authService.updateUserData(saveData).subscribe({
        next: (result) => {
          alert("Successful update");
          this.router.navigate(['/profile'])

        },
        error: (error) => {
          console.log(error);
        }
      });

    }
  }

  getUserData(): void {
    this.authService.getUserData().subscribe({
      next: (result) => {
        this.data = result;
        this.profileForm.patchValue({
          name: this.data.name,
          surname: this.data.surname,
          address: this.data.address,
          email: this.data.email,
          phone: this.data.telephoneNumber
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  navigateToChangePassword(): void {
    this.router.navigate(['/changePw'])
  }

}
