import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ride } from '../../model/Ride';
import { RideService } from '../../services/ride/ride.service';
import { DeclineDialogComponent } from '../decline-dialog/decline-dialog.component';

@Component({
  selector: 'app-new-ride-dialog',
  templateUrl: './new-ride-dialog.component.html',
  styleUrls: ['./new-ride-dialog.component.css']
})
export class NewRideDialogComponent implements OnInit{

  data!: Ride;

  newRide : FormGroup = new FormGroup({
    departure : new FormControl(),
    destination: new FormControl(),
    time : new FormControl(),
    distance: new FormControl(),
    passengerNum: new FormControl(),
    price: new FormControl()
  });

  constructor(private dialogRef: MatDialogRef<NewRideDialogComponent>, @Inject(MAT_DIALOG_DATA) data : any,
  private rideService: RideService, private declineDialog: MatDialog){
    this.data = data;
  }

  ngOnInit(): void {
    this.newRide.disable();
    this.newRide.patchValue({
      departure: this.data.locations[0].departure.address,
      destination: this.data.locations[this.data.locations.length - 1].destination.address,
      time: this.data.estimatedTimeInMinutes,
      distance: this.data.totalDistance,
      passengerNum: this.data.passengers.length,
      price: this.data.totalCost
    });
      
  }

  accept(){
    this.rideService.acceptRide(this.data.id).subscribe({
      next: (result) =>{
        this.dialogRef.close();
      }
    })
  }

  decline(){
    this.openDialog(this.data);
    this.dialogRef.close();
  }

  openDialog(response: Ride){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.height = "auto";
    dialogConfig.width = "35%";

    dialogConfig.data=response;

    const dialogRef = this.declineDialog.open(DeclineDialogComponent, dialogConfig);

  }
}
