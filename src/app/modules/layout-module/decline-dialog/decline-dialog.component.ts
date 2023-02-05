import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MapService } from '../../map/map.service';
import { Location } from '../../model/Location';
import { Ride } from '../../model/Ride';
import { DriverService } from '../../services/driver/driver.service';
import { RideService } from '../../services/ride/ride.service';

@Component({
  selector: 'app-decline-dialog',
  templateUrl: './decline-dialog.component.html',
  styleUrls: ['./decline-dialog.component.css']
})
export class DeclineDialogComponent implements OnInit {

  ride!: Ride;
  panic: boolean;

  ngOnInit(): void {
    
  }

  decline: FormGroup = new FormGroup({
    reason : new FormControl("", Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<DeclineDialogComponent>, @Inject(MAT_DIALOG_DATA) data : any,
   private rideService: RideService, private mapService: MapService, private router: Router){
    this.ride = data.ride;
    this.panic = data.panic;
  }

  submit(){
    if(this.decline.valid){
      if(this.panic){
        this.rideService.panic(this.ride.id, {"reason" : this.decline.value.reason}).subscribe((value) => {
          this.dialogRef.close();
        })

      }else{
        this.rideService.cancelRide(this.ride.id, {"reason": this.decline.value.reason}).subscribe({
          next : (res) => {
            this.dialogRef.close();
          }
        });
      }

      
      
    }
  }

  cancel(){
    this.dialogRef.close();
  }

}
