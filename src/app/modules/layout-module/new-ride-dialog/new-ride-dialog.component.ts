import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-ride-dialog',
  templateUrl: './new-ride-dialog.component.html',
  styleUrls: ['./new-ride-dialog.component.css']
})
export class NewRideDialogComponent implements OnInit{

  description!: string;

  newRide : FormGroup = new FormGroup({
    departure : new FormControl(),
    destination: new FormControl(),
    time : new FormControl(),
    distance: new FormControl(),
    passengerNum: new FormControl(),
    price: new FormControl()
  });

  constructor(private dialogRef: MatDialogRef<NewRideDialogComponent>, @Inject(MAT_DIALOG_DATA) data : any){
    // this.description = data.description;
  }

  ngOnInit(): void {
    this.newRide.disable();
      
  }

  accept(){

  }

  decline(){
    this.dialogRef.close();
  }
}
