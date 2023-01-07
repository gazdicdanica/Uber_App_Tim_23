import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../model/vehicle';
import {AuthService} from '../../auth/auth.service';
import { VehicleService } from '../vehicle.service';


@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit{
  hasVehicle: boolean = false;
  vehicle!: Vehicle;
  driverId!: number;

  constructor(private authService: AuthService, private vehicleService: VehicleService) {
  }

  ngOnInit(): void{
    this.driverId = this.authService.getId();
  }

  ngAfterViewInit(): void{
    this.getVehicle();
  }

  getVehicle(){
    this.vehicleService.getVehicle(this.driverId).subscribe({
      next: (result) =>{
        if(result != null){
          this.hasVehicle = true;
        }
        this.vehicle = result;
      }
    })
  }

}
