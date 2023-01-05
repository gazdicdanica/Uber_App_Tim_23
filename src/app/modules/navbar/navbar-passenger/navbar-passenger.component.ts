import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-passenger',
  templateUrl: './navbar-passenger.component.html',
  styleUrls: ['./navbar-passenger.component.css']
})
export class NavbarPassengerComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main']);
  }
  ngOnInit(): void {

  }

}
