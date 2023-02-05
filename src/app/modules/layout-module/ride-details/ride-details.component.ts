import { DialogConfig } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MapService } from '../../map/map.service';
import { Location } from '../../model/Location';
import { Review } from '../../model/review';
import { Ride } from '../../model/Ride';
import { RideRequest } from '../../model/RideRequest';
import { RideReview } from '../../model/RideReview';
import { Route } from '../../model/Route';
import { User } from '../../model/user';
import { UserShort } from '../../model/UserShort';
import { ReviewService } from '../../services/ride/review.service';
import { RideService } from '../../services/ride/ride.service';
import { UserService } from '../../services/user/user.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { RidePaginatedResponse } from '../ride-history/ride-history.component';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';

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

  passengers : User[] = [];

  hasReview: boolean = false;
  canReview: boolean = true;

  ratingArrDriver : any= [];
  ratingArrVehicle : any=[];
  driverReview! : Review;
  vehicleReview! : Review;

  role : string = "";

  constructor(private route: ActivatedRoute, private rideService: RideService, private authService: AuthService,
     private mapService: MapService, private userService: UserService, private reviewService : ReviewService, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.route.params.subscribe((params) => {
      this.rideService.getRideById(+params['rideId'])
      .subscribe({
        next: (result) => {
          this.ride = result;
          if(this.role === "ROLE_USER")
          {this.userService.getDriverData(this.ride.driver.id).subscribe(
            value => {
              this.driverData = value;
              this.driverData.profilePicture = "data:image/png;base64," + this.driverData.profilePicture
            }
          );}else{
            for(let passenger of this.ride.passengers){
              this.userService.getPassengerData(passenger.id).subscribe(
                value => {
                  value.profilePicture = "data:image/png;base64," + value.profilePicture;
                  this.passengers.push(value);
                }
              )
            }
          }
          this.reviewService.findReviewForRide(this.ride.id).subscribe(
            val => {
              console.log(val);
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
                const now = new Date();
                let diff = now.getTime() - new Date(this.ride.startTime).getTime();
                if(Math.floor(diff / 1000 / 60 / 60) > 72 || this.ride.status!=="FINISHED"){
                  this.canReview = false;
                }
                if(this.ride.status !== "FINISHED"){
                  this.canReview = false;
                }
                
              }
            }
          )
        },
        error: (error) => {
          console.log(error);
        } 
      });
    });

    for(let index = 0; index < 5; index++){
      this.ratingArrDriver.push(index);
      this.ratingArrVehicle.push(index);
    }

    this.mapService.setDrawRoute(true);
  }

  showIcon(index:number, driver: boolean) {
    if(driver && this.driverReview){
      if (this.driverReview.rating >= index + 1) {
      return 'star';
      } else {
        return 'star_border';
      }
    }else if(this.vehicleReview){
      if (this.vehicleReview.rating >= index + 1) {
        return 'star';
        } else {
          return 'star_border';
        }
    }
    return 'star_border';
  }

  getText(rating : number) : string
  {
    switch(rating){
      case 1:
        return "( 1.0 - Bad )";
      case 2: 
        return "( 2.0 - Not good )";  
      case 3:
        return "( 3.0 - Good )";
      case 4:
        return "( 4.0 - Great )";
      case 5: 
        return "( 5.0 - Excelent )";  

    }
    return "";

  }

  addReview(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation= true;
    dialogConfig.height = "auto";
    dialogConfig.width = "35%";

    let p;
    for(let passenger of this.ride.passengers){
      if(passenger.id == this.authService.getId()){
        p = passenger;
        break
      }
    }

    const data = {
      rideId : this.ride.id,
      passenger : p
    }
    dialogConfig.data = data;

    this.dialog.open(ReviewDialogComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(
      val => {
        window.location.reload();
      }
    )
  }

  orderAgain(){
    const rideRequest = new RideRequest(this.ride.locations[0], [],this.ride.vehicleType, null, this.ride.babyTransport, this.ride.petTransport,0);

    this.rideService.createRide(rideRequest).subscribe({
      next : (res) =>{
        this.rideService.setRide(res);
        this.openWaitDialog(res);
      },
      error: (error) => {
        alert(error.error.message);
      }
    })
  }

  openWaitDialog(result : Ride){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.height = "auto";
    dialogConfig.width = "35%";

    dialogConfig.data = result;

    this.dialog.open(WaitingDialogComponent, dialogConfig);
  }
}
