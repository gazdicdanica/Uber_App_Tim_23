import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { DriverService } from '../../services/driver/driver.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';



@Component({
  selector: 'app-navbar-driver',
  templateUrl: './navbar-driver.component.html',
  styleUrls: ['./navbar-driver.component.css']
})
export class NavbarDriverComponent implements OnInit{
  checked: boolean;

  constructor(private driverServiec: DriverService, private authService: AuthService, private router: Router) {
    this.checked = true;
    // this.isOnline = driverServiec.changeDriverState();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }

  ngOnInit(): void {
  }

  changed($event: MatSlideToggleChange) {
    console.log($event);
}

}
