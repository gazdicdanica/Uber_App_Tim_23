import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map/map.service';
import { Router } from '@angular/router';
import { Location } from '../../map/Location';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  startLocation! : Location;
  endLocation! : Location;
  role: any;

  constructor(private mapService: MapService, private router:Router, private authService: AuthService) {}

  ngOnInit():void{

    this.authService.userState$.subscribe((result) => {
      this.role = result;
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.mapService.startSelectedValue$.subscribe((value) => {
      this.startLocation = value;
    });

    this.mapService.endSelectedValue$.subscribe((value) => {
      this.endLocation = value;
    });

    
  }

}
