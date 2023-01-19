import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../model/vehicle';
import {AuthService} from '../../auth/auth.service';
import { VehicleService } from '../vehicle.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit{
  hasVehicle: boolean = false;
  vehicle!: Vehicle;
  driverId!: number;

  constructor(private authService: AuthService, private vehicleService: VehicleService, private router: Router) {
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
          this.vehicle = result;
          this.vehicleService.setHasVehicle(true);
        }
      },
      error: (err) => {}
    })
  }

  navigateToForm(){
    this.router.navigate(['/vehicleForm']);
  }

}
