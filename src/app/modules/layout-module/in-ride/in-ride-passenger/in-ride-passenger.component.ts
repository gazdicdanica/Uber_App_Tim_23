import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MapService } from 'src/app/modules/map/map.service';
import { Location } from 'src/app/modules/model/Location';
import { Ride } from 'src/app/modules/model/Ride';
import { RideService } from 'src/app/modules/services/ride/ride.service';
import { DeclineDialogComponent } from '../../decline-dialog/decline-dialog.component';

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

  rideData!: Ride;

  rideStatus!: string;

  estimationValue = ["", ""];


  constructor(private authService: AuthService, private router: Router, private mapService: MapService, 
    private rideService: RideService, private declineDialog : MatDialog) {}

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

    this.rideService.rideData$.subscribe(
      e => {
        this.rideData = e;
        console.log("IN RIDE \n" + this.rideData.id);
      }
    );

    this.rideService.rideStatus$.subscribe(
      e => {
        if(e === "PANIC"){
          console.log("PNAIC");
        }
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
        // console.log("USLI SMO")
        this.mapService.setDrawRoute(true);
      }
    }
  }

  panic(): void {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.height = "auto";
    dialogConfig.width = "35%";

    const data = {
      ride: this.rideData,
      panic: true
    }

    dialogConfig.data = data;

    this.declineDialog.open(DeclineDialogComponent, dialogConfig);
    this.declineDialog.afterAllClosed.subscribe(e => {
      this.router.navigate(['/main']);
      this.mapService.setStartValue(new Location(0, 0, ''));
      this.mapService.setEndValue(new Location(0, 0, ''));
      this.mapService.setDrawRoute(false);
    })
    
  }

}
