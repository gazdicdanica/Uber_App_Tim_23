import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Location } from '../../model/Location';
import { Route } from '../../model/Route';
import { MapService } from '../../map/map.service';
import { RideRequest } from '../../model/RideRequest';
import { RideService } from '../../services/ride/ride.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../model/user';
import { UserShort } from '../../model/UserShort';
import { VehicleService } from '../../vehicle/vehicle.service';
import { VehicleType } from '../../model/vehicleType';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.component.html',
  styleUrls: ['./ride-info.component.css']
})
export class RideInfoComponent implements OnInit{

  name: string = "ride-info";
  startLocation! : Location;
  endLocation! : Location;
  estimationValue = ["", ""];
  role: any;
  rideReq!:  RideRequest;

  isBaby: boolean = false;
  isPets: boolean = false;
  friend: UserShort[] = [];
  
  vehicleType: string = "";

  @ViewChildren("vehicleCard") vehicleCard! : QueryList<ElementRef>
  // standard: any;
  // luxury: any;
  // van: any;

  rideData: any;

  vehicleTypes!: VehicleType[];

  constructor(private userService: UserService, private mapService: MapService, private router:Router, 
    private authService: AuthService, private rideService: RideService, private vehicleService: VehicleService) { }

  ngOnInit(): void{
    // this.standard = document.getElementById('standard');
    // this.luxury = document.getElementById('luxury');
    // this.van = document.getElementById('van');

    this.role = this.authService.getRole();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.mapService.startSelectedValue$.subscribe((value) => {
      this.startLocation = value;
    });

    this.mapService.endSelectedValue$.subscribe((value) => {
      this.endLocation = value;
    });

    this.mapService.formGroupObservable.subscribe((value) => {

      this.rideData = value;
    })

    this.mapService.setDrawRoute(true);   
    
    this.vehicleService.getAllVehicleTypes().subscribe((value) => {
      this.vehicleTypes = value;
    });
  }
  addItem(estimationValue: string[]){
    this.estimationValue = estimationValue;
  }

  createRide(): void {
    const route = new Route(this.startLocation, this.endLocation, Number(this.estimationValue[0]));
    if (this.rideData.time == undefined) {
      this.rideData.time = new Date();
    }
    this.rideReq = new RideRequest(route, this.friend, this.vehicleType, this.rideData.time, this.isBaby, this.isPets, Number(this.estimationValue[1]));

    if (this.vehicleType == "") {
      alert("Please Choose Vehicle Type");
    } else {
      this.rideService.createRide(this.rideReq).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  changeBaby(): void {
    if(this.isBaby) {
      this.isBaby = false;
    } else {
      this.isBaby = true;
    }
  }

  changePets(): void {
    if(this.isPets) {
      this.isPets = false;
    } else {
      this.isPets = true;
    }
  }

  addFriend(): void {
    const field: any = document.getElementById('friend');
    if (field != undefined && this.friend.length <= 2) {
      this.userService.doesUserExist(field.value).subscribe({
        next: (result) => {
          this.friend.push(new UserShort(null, field.value));
          field.value = "";
          alert("Friend Added Successfully");
        },
        error: (error) => {
          console.log(error);
          alert("User With This Email Does Not Exist");
        }
      });
      
    }
  }

  selectType(type: string) : void{
    this.vehicleType = type;
  }
}
