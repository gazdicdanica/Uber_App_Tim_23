import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewService } from '../../services/ride/review.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit{

  driverRating : number = 0;
  vehicleRating : number = 0;

  @Output() dRatingUpdated = new EventEmitter();
  @Output() vRatingUpdated = new EventEmitter();

  ratingArrDriver : any = [];
  ratingArrVehicle : any = [];

  review = new FormGroup({

  });

  constructor(private dialogRef: MatDialogRef<ReviewDialogComponent>, @Inject(MAT_DIALOG_DATA) data : any,
  private reviewService: ReviewService){}

  ngOnInit(): void {
    for(let i = 0; i < 5; i++){
      this.ratingArrDriver.push(i);
      this.ratingArrVehicle.push(i);
    }
  }

  rate(rating : number, driver : boolean){
    console.log(rating);
    if(driver){this.driverRating = rating}
    else {this.vehicleRating = rating}
  }

  showIcon(index:number, driver: boolean) {
    if(driver){
      if (this.driverRating >= index + 1) {
      return 'star';
      } else {
        return 'star_border';
      }
    }else{
      if (this.vehicleRating >= index + 1) {
        return 'star';
        } else {
          return 'star_border';
        }
    }
  }

  submit(){


    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
