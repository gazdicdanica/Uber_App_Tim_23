import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Favorite } from '../../model/Favorite';
import { RideService } from '../../services/ride/ride.service';

@Component({
  selector: 'app-favorite-rides',
  templateUrl: './favorite-rides.component.html',
  styleUrls: ['./favorite-rides.component.css']
})
export class FavoriteRidesComponent implements OnInit{

  constructor(private rideService: RideService, private router: Router) {}

  displayedColumns: String[] = ['name', 'departure', 'destination', 'friends','vehicleType', 'babyTransport', 'petTransport'];

  dataSource!: MatTableDataSource<Favorite>;
  data!: Favorite[];

  ngOnInit(){
    this.getData();
  }

  getData() : void{
    this.rideService.getFavorites().subscribe({
      next : (result) =>{
        this.data = result;

        console.log(this.data);

        this.dataSource = new MatTableDataSource<Favorite>(this.data);
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  orderRide(element : Favorite) : void{
    console.log(element);
    this.rideService.setFavorite(element);
    this.router.navigate(['/rideInfo']);

  }

}
