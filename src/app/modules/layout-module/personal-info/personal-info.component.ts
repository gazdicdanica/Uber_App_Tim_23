
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../user/user-model';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}
  data!: User;
  fullName!: string;
  // @Input() name: string;

  profileForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }


  ngOnInit(): void {
    this.profileForm.disable();
  }

  // readURL(input: any) {
  //   if (input.files && input.files[0]) {
  //       var reader = new FileReader();
  //       reader.onload = e => {
  //           $('#imagePreview').css('background-image', 'url('+ e.target.result +')');
  //           $('#imagePreview').hide();
  //           $('#imagePreview').fadeIn(650);
  //       }
  //       reader.readAsDataURL(input.files[0]);
  //   }
  // }

// $("#imageUpload").change(function() {
//   this.readURL(this);
// });

  ngAfterViewInit(): void {
    this.getUserData();
  }
  
  getUserData(): void {
    this.authService.getUserData().subscribe({
      next: (result) => {
        this.data = result;
        this.profileForm.patchValue({
          address: this.data.address,
          email: this.data.email,
          phone: this.data.telephoneNumber
        });
        this.fullName = this.data.name + " " + this.data.surname;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
