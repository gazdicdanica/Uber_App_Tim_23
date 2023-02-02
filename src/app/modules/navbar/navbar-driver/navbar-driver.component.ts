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
  checked!: boolean;

  constructor(private driverService: DriverService, private authService: AuthService, private router: Router) {
  }

  online = new FormGroup({
    isOnline: new FormControl(),
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  ngOnInit(): void {
    this.driverService.getDriverStatus().subscribe(result => {
      this.checked = result;
    })
  }

  startShift() : void{
    this.driverService.changeDriverState(true).subscribe({
      next: (result) => {
        this.checked = true;
      },
      error: (error) => {
        console.log(error);
        alert("Your Shift Cannot Start Now");
        this.checked = false;
      },
    });

  }

  endShift() : void{
    this.driverService.changeDriverState(false).subscribe({
      next: (result) => {
        this.checked = false;
      },
      error: (error) => {
        console.log(error);
        this.checked = true;
      },
    });
  }

  changed($event: MatSlideToggleChange) {
    if($event.checked) {
      this.startShift();
    } else {
      this.endShift();
    }
    this.checked = $event.checked;
  }

}
