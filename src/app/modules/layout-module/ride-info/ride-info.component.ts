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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';
import { Ride } from '../../model/Ride';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { Favorite } from '../../model/Favorite';

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
  isSchedule: boolean = true;
  friend: UserShort[] = [];
    
  vehicleType: string = "";

  @ViewChildren("vehicleCard") vehicleCard! : QueryList<ElementRef>

  rideData: any;
  favorite!: Favorite;

  vehicleTypes!: VehicleType[];

  constructor(private userService: UserService, private mapService: MapService, private router:Router, 
    private authService: AuthService, private rideService: RideService, private vehicleService: VehicleService,
    private dialog: MatDialog) { }

  ngOnInit(): void{

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
    });

    this.rideService.favorite$.subscribe((value) => {
      this.favorite = value;
      if(this.favorite.id != 0){
        this.startLocation = value.locations[0].departure;
        this.endLocation = value.locations[0].destination;
        this.selectType(value.vehicleType);
        for(let user of value.passengers.slice(1)){
          if(user.id != localStorage.getItem("id")) this.addFriendByEmail(user.email);
        }
        this.isBaby = value.babyTransport;
        this.isPets = value.petTransport;

      }
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

    if(this.startLocation.address === "" || this.endLocation.address === ""){
      alert("Please choose both start and end locations");
      return;
    }

    const route = new Route(this.startLocation, this.endLocation, Number(this.estimationValue[0]));

    let time = null;
    if (this.rideData != null) {
      if (this.rideData.time == null) {
        this.isSchedule = false;
      }else{
        time = this.rideData.time;
      }
    } else{
      this.isSchedule = false;
    }
    console.log(time);
    this.rideReq = new RideRequest(route, this.friend, this.vehicleType, time, this.isBaby, this.isPets, Number(this.estimationValue[1]));
    console.log(this.rideReq);

    if (this.vehicleType == "") {
      alert("Please Choose Vehicle Type");
    } else {
      this.rideService.createRide(this.rideReq).subscribe({
        next: (result) => {
          this.rideService.setRide(result);          
          if(this.isSchedule) {
            alert("System notified, see you soon");
            this.router.navigate(['/']);
          } else {
            this.openWaitDialog(result);
          }
          console.log(result);
        },
        error: (error) => {
          alert(error.error.message);
          this.router.navigate(["/"]);
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

  addFriendByEmail(email : string){
    this.userService.doesUserExist(email).subscribe({
      next: (result) => {
        this.friend.push(new UserShort(null, email));
      },
      error: (error) => {
        console.log(error);
      }
    });
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

  openFavoriteDialog(){

    if(this.startLocation.address === "" || this.endLocation.address === ""){
      alert("Please choose both start and end locations");
      return;
    }

    if (this.vehicleType == "") {
      alert("Please Choose Vehicle Type");
      return;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.height = "auto";
    dialogConfig.width = "35%";

    const data = {
      babies : this.isBaby,
      pets : this.isPets,
      departure : this.startLocation,
      destination : this.endLocation,
      vehicleType : this.vehicleType,
      friends : this.friend
    }

    dialogConfig.data = data;
    this.dialog.open(FavoriteDialogComponent, dialogConfig);
    
  }
}
