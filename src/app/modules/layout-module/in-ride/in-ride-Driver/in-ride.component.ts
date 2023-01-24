import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { latLng, LatLng } from 'leaflet';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MapService } from 'src/app/modules/map/map.service';
import { Location } from 'src/app/modules/model/Location';
import { Ride } from 'src/app/modules/model/Ride';
import { DriverService } from 'src/app/modules/services/driver/driver.service';
import { RideService } from 'src/app/modules/services/ride/ride.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeclineDialogComponent } from '../../decline-dialog/decline-dialog.component';

@Component({
  selector: 'app-in-ride',
  templateUrl: './in-ride.component.html',
  styleUrls: ['./in-ride.component.css']
})
export class InRideComponent {
  startLocation: any = new Location(0, 0, '');
  endLocation: any = new Location(0, 0, '');
  role: any;
  private rideData!: Ride;


  estimationValue = ["", ""];

  finishBtn!: HTMLElement;
  startBtn!: HTMLElement;


  constructor(private authService: AuthService, private rideService: RideService, private driverService: DriverService,
    private mapService: MapService, private router: Router, private dialog: MatDialog) {

    rideService.rideData$.subscribe(
      e => {
        this.rideData = e;
        driverService.getDriverLocation(driverService.getId()).subscribe({
          next: (result) => {
            this.startLocation = new Location(result.longitude, result.latitude, result.address);
            const x = this.rideData.locations[0].departure;
            this.endLocation = new Location(x.longitude, x.latitude, x.address);
            mapService.setDrawRoute(true);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    );
  }

  addItem(estimationValue: string[]){
    this.estimationValue = estimationValue;
  }

  ngAfterViewInit() {
    const temp = document.getElementById('finishBtn');
    const temp2 = document.getElementById('startBtn');

    if (temp != null && temp2 != null) {
      this.finishBtn = temp;
      this.startBtn = temp2;

      this.finishBtn.style.display = "none";
    }
  }

  ngOnInit() {
    this.role = this.authService.getRole();
    this.rideService.rideStatus$.subscribe(
      e => {
        console.log(e);

      }
    )
  }

  startRide(): void {
    this.startBtn.style.display = "none";
    this.finishBtn.style.display= "flex";
    this.rideService.startRide(this.rideData.id).subscribe({
      next: (result) => {
        this.rideService.setRideStatus(result.status);
        // console.log(result);
      },
      error: (error) => {
        console.log(error);
      }
    });


    this.startLocation = this.endLocation;
    this.mapService.setStartValue(this.startLocation);
    
    const temp = this.rideData.locations[0].destination;
    this.endLocation = new Location(temp.longitude, temp.latitude, temp.address);
    this.mapService.setEndValue(this.endLocation);

    this.mapService.setDrawRoute(true);
  }

  finishRide(): void {
    this.rideService.finishRide(this.rideData.id).subscribe({
      next: (result) => {
        // console.log(result);
        this.rideService.setRideStatus(result.status);
        this.driverService.updateLocation(this.endLocation).subscribe();
        this.mapService.setStartValue(new Location(0, 0, ''));
        this.mapService.setEndValue(new Location(0, 0, ''));
        this.mapService.setDrawRoute(false);
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.log(error);
      }
    });
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

    this.dialog.open(DeclineDialogComponent, dialogConfig);
    this.driverService.updateLocation(this.startLocation).subscribe();
    this.dialog.afterAllClosed.subscribe(e=> {
      this.router.navigate(['/main']);
      this.mapService.setStartValue(new Location(0, 0, ''));
      this.mapService.setEndValue(new Location(0, 0, ''));
      this.mapService.setDrawRoute(false);
    })
    
  }
}
