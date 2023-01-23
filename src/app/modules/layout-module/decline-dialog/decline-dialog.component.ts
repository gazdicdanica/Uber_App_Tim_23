import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Ride } from '../../model/Ride';
import { RideService } from '../../services/ride/ride.service';

@Component({
  selector: 'app-decline-dialog',
  templateUrl: './decline-dialog.component.html',
  styleUrls: ['./decline-dialog.component.css']
})
export class DeclineDialogComponent implements OnInit {

  data!: Ride;

  ngOnInit(): void {
    
  }

  decline: FormGroup = new FormGroup({
    reason : new FormControl("", Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<DeclineDialogComponent>, @Inject(MAT_DIALOG_DATA) data : any, private rideService: RideService){
    this.data = data;
  }

  submit(){
    if(this.decline.valid){
      this.rideService.cancelRide(this.data.id, {"reason": this.decline.value.reason}).subscribe({
        next : (res) => {
          this.dialogRef.close();
        }
      });
    }
  }

}
