import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { latLng, LatLng } from 'leaflet';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MapService } from 'src/app/modules/map/map.service';
import { Location } from 'src/app/modules/model/Location';
import { Ride } from 'src/app/modules/model/Ride';
import { DriverService } from 'src/app/modules/services/driver/driver.service';
import { RideService } from 'src/app/modules/services/ride/ride.service';
import { interval, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeclineDialogComponent } from '../../decline-dialog/decline-dialog.component';
import { PanicDialogComponent } from '../panic-dialog/panic-dialog.component';
import { WebSocketService } from 'src/app/modules/services/WebSocket/WebSocket.service';
import { ReviewDialogComponent } from '../../review-dialog/review-dialog.component';

@Component({
  selector: 'app-in-ride',
  templateUrl: './in-ride.component.html',
  styleUrls: ['./in-ride.component.css']
})
export class InRideComponent implements OnInit, OnDestroy{
  startLocation: any = new Location(0, 0, '');
  endLocation: any = new Location(0, 0, '');
  role: any;
  private rideData!: Ride;

  stompClient!: any;

  estimationValue = ["", ""];

  finishBtn!: HTMLElement;
  startBtn!: HTMLElement;


  constructor(private authService: AuthService, private rideService: RideService, private driverService: DriverService,
    private mapService: MapService, private wsService: WebSocketService, private router: Router, private dialog: MatDialog) {

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
  ngOnDestroy(): void {
    this.wsService.closeConnection();
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
    this.stompClient = this.wsService.connect();
    let that = this;
    this.stompClient.connect({}, function(){
      that.openSocket();
    });
  }

  startRide(): void {
    this.startBtn.style.display = "none";
    this.finishBtn.style.display= "flex";
    this.rideService.startRide(this.rideData.id).subscribe({
      next: (result) => {
        // this.rideService.setRide(result);
        // console.log(result);
      },
      error: (error) => {
        console.log(error);
      }
    });


    this.startLocation = this.endLocation;
    this.mapService.setStartValue(this.startLocation);
    
    const temp = this.rideData.locations[0].destination;
    console.log(temp);
    this.endLocation = new Location(temp.longitude, temp.latitude, temp.address);
    console.log(this.endLocation);
    this.mapService.setEndValue(this.endLocation);

    this.mapService.setDrawRoute(true);
  }

  finishRide(): void {
    this.rideService.finishRide(this.rideData.id).subscribe({
      next: (result) => {
        this.rideService.setRide(result);
        // console.log(result);
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
    
  }

  openPanicDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.height = "15%";
    dialogConfig.width = "20%";

    this.dialog.open(PanicDialogComponent, dialogConfig);

  }

  openSocket() : void{
    this.stompClient.subscribe("/ride-panic/" + this.authService.getId(), (message: {body: string}) => {
      let response : Ride = JSON.parse(message.body);

      if(response.status === "PANIC"){
        this.openPanicDialog();
        this.router.navigate(["/main"]);
        this.mapService.setStartValue(new Location(0, 0, ''));
        this.mapService.setEndValue(new Location(0, 0, ''));
        this.mapService.setDrawRoute(false);
      }
      
    });

    this.stompClient.subscribe("/ride-cancel/" + this.authService.getId(), (message : {body : string}) => {
      let response: Ride = JSON.parse(message.body);
      alert("Pending ride is canceled");
      if(this.dialog){
        this.dialog.closeAll();
      }
      this.router.navigate(["/main"]);
      
    });
  }


}
