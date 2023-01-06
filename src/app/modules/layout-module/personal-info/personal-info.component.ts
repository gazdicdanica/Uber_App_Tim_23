import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}

  profileForm = new FormGroup({
    email: new FormControl(),
    telNum: new FormControl(),
    address: new FormControl()
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  ngOnInit(): void {
    this.profileForm.disable();
    const user = localStorage.getItem('user');


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

  
}
