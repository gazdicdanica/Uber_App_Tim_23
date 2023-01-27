import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from '../../map/map.service';
import { Router } from '@angular/router';
import { Location } from '../../map/Location';
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { NewRideDialogComponent } from '../new-ride-dialog/new-ride-dialog.component';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebSocketService } from '../../services/WebSocket/WebSocket.service';
import { Ride } from '../../model/Ride';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{
  startLocation! : Location;
  endLocation! : Location;
  role: any;

  name: string = "main";

  stompClient: any;

  constructor(private mapService: MapService, private router:Router, private authService: AuthService,
    private wsService: WebSocketService, private dialog: MatDialog) {
  }
  ngOnDestroy(): void {
    this.wsService.closeConnection();
  }

  ngAfterViewInit() : void{
    if(this.role == "ROLE_DRIVER"){
      const elem = document.getElementById('mapica');
      if(elem != undefined) {
        elem.style.height = "91vh";
      }
    }
  }

  ngOnInit():void{

    this.authService.userState$.subscribe((result) => {
      this.role = result;
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.mapService.setStartValue(new Location(0,0,""));
    this.mapService.setEndValue(new Location(0,0,""));
    this.mapService.setDrawRoute(false);

    this.mapService.startSelectedValue$.subscribe((value) => {
      this.startLocation = value;
    });

    this.mapService.endSelectedValue$.subscribe((value) => {
      this.endLocation = value;
    });

    if(this.role == "ROLE_DRIVER"){
      const elem = document.getElementById('mapica');
      if(elem != undefined) {
        elem.style.height = "91vh";
      }

      if(this.stompClient == null){
        this.stompClient = this.wsService.connect();
        let that = this;
        this.stompClient.connect({}, function() {
          that.openSocket();
        });
      }
      
    } else if (this.role == "ROLE_USER") {
        if(this.stompClient == null) {
          this.stompClient = this.wsService.connect();
          let that = this;
          this.stompClient.connect({}, function() {
            that.openSocketPassenger();
          });
        }
    }  
  }

  openSocketPassenger(): void {
    this.stompClient.subscribe("/linkPassengers/"+this.authService.getId(), (message: {body: string}) => {
      let response : Ride = JSON.parse(message.body);
      console.log(response);
      this.openDialog(response, false);
    });

    this.stompClient.subscribe("/scheduledNotifications/"+this.authService.getId(), (message: {body: string}) => {
      let response: Ride = JSON.parse(message.body);

      if(response.status == "REJECTED"){
        alert("Unsuccessful ride schedule \nUnfortunately, all drivers are busy.\nPlease try again");
      }else if(response.status == "ACCEPTED"){
        alert("Ride scheduled successfuly\n\nDriver is on his way!");
        this.openDialog(response, false);
      }
    });
  }

  openSocket(): void{
    this.stompClient.subscribe("/ride-driver/"+this.authService.getId(), (message: {body: string}) => {
      let response : Ride = JSON.parse(message.body);
      this.openDialog(response, true);
    });

    this.stompClient.subscribe("/ride-passenger/"+this.authService.getId(), (message: {body: string}) => {
      let response: Ride = JSON.parse(message.body);
      this.openDialog(response, false);
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

  openDialog(response: Ride, isDriver: boolean){

    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.closeOnNavigation = false;
      dialogConfig.height = "auto";
      dialogConfig.width = "35%";

      dialogConfig.data=response;

      const dialogRef = this.dialog.open(NewRideDialogComponent, dialogConfig);
  }

}
