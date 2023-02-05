import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route } from '../../model/Route';
import { RideService } from '../../services/ride/ride.service';

@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.css']
})
export class FavoriteDialogComponent implements OnInit{

  favoriteGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    departure: new FormControl({value: '', disabled : true}),
    destination : new FormControl({value: '', disabled : true}),
    passengerNum : new FormControl({value: '', disabled : true}),
    vehicleType: new FormControl({value: '', disabled : true}),
    babies : new FormControl({value: false, disabled : true}),
    pets: new FormControl({value: false, disabled : true})
  });

  data! : any;

  constructor(private dialogRef: MatDialogRef<FavoriteDialogComponent>, @Inject(MAT_DIALOG_DATA) data : any, private rideService: RideService) {
    this.data = data;
    this.favoriteGroup.patchValue({
      departure : data.departure.address,
      destination : data.destination.address,
      vehicleType : data.vehicleType,
      passengerNum : data.friends.length,
      babies : data.babies,
      pets : data.pets
    })
  }

  ngOnInit(): void {
    
  }

  submit(){
    if(this.favoriteGroup.valid){
      const req = {
        favoriteName : this.favoriteGroup.value.name,
        locations : [new Route(this.data.departure, this.data.destination, 0)],
        vehicleType : this.data.vehicleType,
        babyTransport : this.data.babies,
        petTransport : this.data.pets,
        passengers : this.data.friends
      }
      this.rideService.addFavorite(req).subscribe({
        next : (res) => {
          alert("Favorite ride successfully added");

        },
        error : (err) => {
          alert(err.error.message);
        }
      });
    }
    this.dialogRef.close();
    
  }

  cancel(){
    this.dialogRef.close();
  }

}
