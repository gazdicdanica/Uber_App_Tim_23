import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/user-model';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-change-personal-info',
  templateUrl: './change-personal-info.component.html',
  styleUrls: ['./change-personal-info.component.css']
})
export class ChangePersonalInfoComponent implements OnInit {

  data!: User;
  picturePath: string = "";
  base64: string = ""

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getUserData();
  }

  profileForm = new FormGroup({
    picture: new FormControl(''),
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
      profilePicture: this.profileForm.value.phone,
      email: this.data.email,
      address: this.profileForm.value.address,
      telephoneNumber: this.profileForm.value.phone,
    };
    if (this.profileForm.valid) {
      console.log(saveData.profilePicture);

      if(saveData.profilePicture === ''){
        saveData.profilePicture = this.data.profilePicture;
      }
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

  previewImage(input:any) : void{
    let file: File = input.files[0];
    let reader: FileReader = new FileReader();

    reader.readAsBinaryString(file);
    reader.onload = () => {
      this.picturePath = URL.createObjectURL(file);
      console.log(reader.result);

    }
    
  }

  imageListener($event: any): void{
    this.previewImage($event.target);
  }

  getUserData(): void {
    this.authService.getUserData().subscribe({
      next: (result) => {
        this.data = result;
        this.profileForm.patchValue({
          picture: '',
          name: this.data.name,
          surname: this.data.surname,
          address: this.data.address,
          email: this.data.email,
          phone: this.data.telephoneNumber
        });
        this.picturePath =  result.profilePicture;
        
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
