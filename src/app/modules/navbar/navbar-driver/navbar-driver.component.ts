import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { DriverService } from '../../services/driver/driver.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-navbar-driver',
  templateUrl: './navbar-driver.component.html',
  styleUrls: ['./navbar-driver.component.css']
})
export class NavbarDriverComponent implements OnInit{
  checked: boolean;

  constructor(private driverService: DriverService, private authService: AuthService, private router: Router) {
    this.checked = false;
  }

  online = new FormGroup({
    isOnline: new FormControl(),
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  ngOnInit(): void {
  }

  changed($event: MatSlideToggleChange) {
    if($event.checked) {
      this.driverService.changeDriverState(true).subscribe({
        next: (result) => {
          this.checked = true;
        },
        error: (error) => {
          console.log(error);
          alert("Your Shift Cannot Start Now")
          this.checked = false;

          // this.online.patchValue({
          //   super: false
          // })
        },
      });
    } else {
      this.driverService.changeDriverState(false).subscribe({
        next: (result) => {
          console.log("smena zavrsena")
          this.checked = false;
        },
        error: (error) => {
          console.log(error);
          this.checked = true;
        },
      });
    }
    this.checked = $event.checked;
  }

}
