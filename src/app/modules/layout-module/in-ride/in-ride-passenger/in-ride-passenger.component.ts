import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MapService } from 'src/app/modules/map/map.service';
import { Location } from 'src/app/modules/model/Location';
import { Ride } from 'src/app/modules/model/Ride';
import { RideService } from 'src/app/modules/services/ride/ride.service';
import { WebSocketService } from 'src/app/modules/services/WebSocket/WebSocket.service';
import { DeclineDialogComponent } from '../../decline-dialog/decline-dialog.component';
import { PanicDialogComponent } from '../panic-dialog/panic-dialog.component';

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

  stompClient! : any;

  rideStatus!: string;

  rideData!: Ride;

  estimationValue = ["", ""];


  constructor(private authService: AuthService, private router: Router, private mapService: MapService, 
    private rideService: RideService, private wsService: WebSocketService, private dialog : MatDialog) {}

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

    this.stompClient = this.wsService.connect(true);
    let that = this;
    this.stompClient.connect({}, function(){
      that.openSocket();
    })

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

    this.dialog.open(DeclineDialogComponent, dialogConfig);
    
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
        this.openPanicDialog();
        this.router.navigate(["/main"]);
        this.mapService.setStartValue(new Location(0, 0, ''));
        this.mapService.setEndValue(new Location(0, 0, ''));
        this.mapService.setDrawRoute(false);
      
      
    });

    this.stompClient.subscribe("/ride-passenger/" + this.authService.getId(), (message: {body: string}) => {
      let response : Ride = JSON.parse(message.body);
      this.rideStatus = response.status;
      if(this.rideStatus === "FINISHED"){
        // TODO oceni voznju
        this.router.navigate(["/main"]);
        this.mapService.setStartValue(new Location(0, 0, ''));
        this.mapService.setEndValue(new Location(0, 0, ''));
        this.mapService.setDrawRoute(false);
      }

        
      
      
    });
  }

  canDeactivate() : boolean{
    if(this.rideStatus === "ACTIVE" || this.rideStatus === "ACCEPTED"){
      return false;
    }
    return true;
  }

}
