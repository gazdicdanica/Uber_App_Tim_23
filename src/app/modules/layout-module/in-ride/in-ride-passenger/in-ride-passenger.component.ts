import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MapService } from 'src/app/modules/map/map.service';
import { Location } from 'src/app/modules/model/Location';
import { RideService } from 'src/app/modules/services/ride/ride.service';

@Component({
  selector: 'app-in-ride-passenger',
  templateUrl: './in-ride-passenger.component.html',
  styleUrls: ['./in-ride-passenger.component.css']
})
export class InRidePassengerComponent {
  role!: any;
  startLocation! : Location;
  endLocation! : Location;
  search!: HTMLElement;

  estimationValue = ["", ""];


  constructor(private authService: AuthService, private router: Router, private mapService: MapService, 
    private rideService: RideService) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    this.mapService.startSelectedValue$.subscribe(
      e => {
        this.startLocation = e;
      }
    )
    this.mapService.endSelectedValue$.subscribe(
      e => {
        this.endLocation = e;
      }
    )
  }

  addItem(estimationValue: string[]){
    this.estimationValue = estimationValue;
  }

  ngAfterViewInit() {
    const x = document.getElementById('search-id');
    if(x != null) {
      this.search = x;
      this.search.style.display = "none";
      if(this.startLocation != null) {
        console.log("USLI SMO")
        this.mapService.setDrawRoute(true);
      }
    }
  }

  panic(): void {}

}
