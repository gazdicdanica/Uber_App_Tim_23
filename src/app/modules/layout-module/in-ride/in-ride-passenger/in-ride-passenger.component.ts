import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MapService } from 'src/app/modules/map/map.service';
import { Location } from 'src/app/modules/model/Location';
import { Ride } from 'src/app/modules/model/Ride';
import { RideService } from 'src/app/modules/services/ride/ride.service';
import { WebSocketService } from 'src/app/modules/services/WebSocket/WebSocket.service';
import { DeclineDialogComponent } from '../../decline-dialog/decline-dialog.component';
import { ReviewDialogComponent } from '../../review-dialog/review-dialog.component';
import { PanicDialogComponent } from '../panic-dialog/panic-dialog.component';

@Component({
  selector: 'app-in-ride-passenger',
  templateUrl: './in-ride-passenger.component.html',
  styleUrls: ['./in-ride-passenger.component.css']
})
export class InRidePassengerComponent implements OnInit, OnDestroy{
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

  ngOnDestroy(): void {
    this.wsService.closeConnection(this.stompClient);
  }

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

    if(this.stompClient == null){
      this.stompClient = this.wsService.connect();
      let that = this;
      this.stompClient.connect({}, function(){
        that.openSocket();
      })
    ;}

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
        this.mapService.setStartValue(new Location(0, 0, ''));
        this.mapService.setEndValue(new Location(0, 0, ''));
        this.mapService.setDrawRoute(false);
        this.router.navigate(["/"]);
        this.rideStatus = "PANIC";
      
      
    });

    let i : boolean = false;

    this.stompClient.subscribe("/driver-arrived/"+this.rideData.id, (message : {body : string}) => {
      if(!i){
        alert("Driver arrived on departure location!");
        i = true;
      }
      
    })

    this.stompClient.subscribe("/ride-passenger/" + this.authService.getId(), (message: {body: string}) => {
      let response : Ride = JSON.parse(message.body);
      this.rideData = response;
      this.rideStatus = response.status;
      if(this.rideStatus === "FINISHED"){
        this.openReviewDialog();
        this.router.navigate(["/"]);
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

  openReviewDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation= true;
    dialogConfig.height = "auto";
    dialogConfig.width = "35%";

    let p;
    for(let passenger of this.rideData.passengers){
      if(passenger.id == this.authService.getId()){
        p = passenger;
        break
      }
    }

    const data = {
      rideId : this.rideData.id,
      passenger : p
    }
    dialogConfig.data = data;

    this.dialog.open(ReviewDialogComponent, dialogConfig);

  }

}
