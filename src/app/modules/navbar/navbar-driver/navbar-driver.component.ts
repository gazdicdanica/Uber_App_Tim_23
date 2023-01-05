import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-navbar-driver',
  templateUrl: './navbar-driver.component.html',
  styleUrls: ['./navbar-driver.component.css']
})
export class NavbarDriverComponent implements OnInit{
  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }
  ngOnInit(): void {

  }
}
