import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MapService } from '../../map/map.service';
import { Location } from '../../model/Location';
import { Review } from '../../model/review';
import { RideReview } from '../../model/RideReview';
import { User } from '../../model/user';
import { UserShort } from '../../model/UserShort';
import { ReviewService } from '../../services/ride/review.service';
import { RideService } from '../../services/ride/ride.service';
import { UserService } from '../../services/user/user.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { RidePaginatedResponse } from '../ride-history/ride-history.component';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent {
  ride: RidePaginatedResponse = {
    id: 0,
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

  driverData: User={
    id: 0,
    name: "",
    surname: "",
    profilePicture: "",
    email: "",
    telephoneNumber: "",
    address: ""
  };

  hasReview: boolean = true;

  driverReview! : Review;
  vehicleReview! : Review;

  constructor(private route: ActivatedRoute, private rideService: RideService, private authService: AuthService,
     private mapService: MapService, private userService: UserService, private reviewService : ReviewService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rideService.getRideById(+params['rideId'])
      .subscribe({
        next: (result) => {
          this.ride = result;
          this.userService.getDriverData(this.ride.driver.id).subscribe(
            value => {
              this.driverData = value;
              this.driverData.profilePicture = "data:image/png;base64," + this.driverData.profilePicture
            }
          );
          this.reviewService.findReviewForRide(this.ride.id).subscribe(
            val => {
              for(let review of val.vehicleReviews){
                if(review.passenger.id == this.authService.getId()){
                  this.vehicleReview = review;
                  break;
                }
              }
              for(let review of val.driverReviews){
                if(review.passenger.id == this.authService.getId()){
                  this.driverReview = review;
                  console.log(this.driverReview)
                  break;
                }
              }

              if(this.driverReview || this.vehicleReview){
                this.hasReview = true;
              }else{
                // check if 3 days passed;
              }
            }
          )
        },
        error: (error) => {
          console.log(error);
        } 
      });
    });

    this.mapService.setDrawRoute(true);
  }
}
