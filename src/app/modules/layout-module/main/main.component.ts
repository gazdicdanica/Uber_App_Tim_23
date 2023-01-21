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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  startLocation! : Location;
  endLocation! : Location;
  role: any;

  constructor(private mapService: MapService, private router:Router, private authService: AuthService, private dialog: MatDialog) {}

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
      this.openDialog();
    }

    
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.height = "auto";
    dialogConfig.width = "35%";

    const dialogRef = this.dialog.open(NewRideDialogComponent, dialogConfig);

  }

}
