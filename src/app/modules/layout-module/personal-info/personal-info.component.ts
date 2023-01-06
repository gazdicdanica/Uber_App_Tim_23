
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}
  data: any;
  // @Input() name: string;

  profileForm = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }


  ngOnInit(): void {
    // this.profileForm.disable();
    // const user = localStorage.getItem('user');


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
        console.log(this.data);
        this.profileForm.patchValue({
          fullname: this.data.name + ' ' + this.data.surname,
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

  updateUser(): void {
    const saveData = {
      name: this.data.name,
      surname: this.data.surname,
      profilePicture: this.data.profilePicture,
      email: this.data.email,
      address: this.profileForm.value.address,
      telephoneNumber: this.profileForm.value.phone,
    };
    if (this.profileForm.valid){
      if(saveData.address != this.data.address ||
        saveData.telephoneNumber != this.data.telephoneNumber){
          this.authService.updateUserData(saveData).subscribe({
          next: (result) => {
            console.log(result);
            
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  jmpToChangePw(): void {
    this.router.navigate(['/changePw'])
  }
}
