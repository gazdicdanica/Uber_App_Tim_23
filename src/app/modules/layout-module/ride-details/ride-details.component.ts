import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../model/Location';
import { UserShort } from '../../model/UserShort';
import { RideService } from '../../services/ride/ride.service';
import { RidePaginatedResponse } from '../ride-history/ride-history.component';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent {
  ride: RidePaginatedResponse = {
    _id: 0,
    driver: new UserShort(0, ''),
    locations: [],
    passengers: [],
    petTransport: false,
    babyTransport: false,
    status: '',
    vehicleType: '',
    rejection: null,
    totalCost: 0,
    startTime: new Date(),
    endTime: new Date(),
    totalDistance: 0,
  };

  constructor(private route: ActivatedRoute, private rideService: RideService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rideService.getRideById(+params['rideId'])
      .subscribe({
        next: (result) => {
          this.ride = result;
        },
        error: (error) => {
          console.log(error);
        } 
      });
    });
  }
}
