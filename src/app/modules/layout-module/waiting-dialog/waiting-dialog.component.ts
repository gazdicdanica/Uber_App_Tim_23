import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Ride } from '../../model/Ride';
import { RideService } from '../../services/ride/ride.service';
import { WebSocketService } from '../../services/WebSocket/WebSocket.service';

@Component({
  selector: 'app-waiting-dialog',
  templateUrl: './waiting-dialog.component.html',
  styleUrls: ['./waiting-dialog.component.css']
})
export class WaitingDialogComponent implements OnInit{

  stompClient: any;

  wait: boolean = true;
  message: string = "";
  title: string = "";

  data!: Ride ;

  constructor(private dialogRef: MatDialogRef<WaitingDialogComponent>, private wsService: WebSocketService,
     private authService: AuthService, private rideService: RideService, private router: Router){}

  ngOnInit(): void {
    this.title = "Waiting for driver...";

    this.stompClient = this.wsService.connect(true);
    let that = this;
    if(this.stompClient.status != "CONNECTED"){
      this.stompClient.connect({}, function(){
        that.openPassengerSocket();
      })
    }else{
      this.openPassengerSocket();
    }
    
  }

  openPassengerSocket(): void{
    this.stompClient.subscribe("/ride/" +  this.authService.getId(), (message: {body : string}) => {
      let response : Ride = JSON.parse(message.body);
      console.log()
      this.data = response;
      this.wait = false;
      this.dialogRef.updateSize("35%", "auto");
      this.rideService.setRide(response);
      if(response.status == "REJECTED"){
        this.title = "Unsuccessful ride schedule";
        this.message = "Unfortunately, all drivers are busy.\nPlease try again";
      }else if(response.status == "ACCEPTED"){
        this.title = "Ride scheduled successfuly";
        this.message = "Driver is on his way!";
      }
    })
  }

  closeDialog(){
    if(this.data.status == "REJECTED"){
      this.dialogRef.close();
    }else{
      this.router.navigate(["/psngrInRide"]);
      this.dialogRef.close();
    }
  }
}
