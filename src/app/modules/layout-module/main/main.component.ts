import { Component, OnInit } from '@angular/core';
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
export class MainComponent implements OnInit{
  startLocation! : Location;
  endLocation! : Location;
  role: any;

  name: string = "main";

  stompClient: any;

  constructor(private mapService: MapService, private router:Router, private authService: AuthService,private wsService: WebSocketService, private dialog: MatDialog) {}

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
      
    }

    
  }

  openSocket(){
    this.stompClient.subscribe("/ride/"+this.authService.getId(), (message: {body: string}) => {
      let response : Ride = JSON.parse(message.body);
      this.openDialog(response);
    });
  }

  openDialog(response: Ride){

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
