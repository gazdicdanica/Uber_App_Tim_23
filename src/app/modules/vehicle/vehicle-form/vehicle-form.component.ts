import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../../model/vehicle';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Type } from '../../model/type';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit{

  vehicle!: Vehicle;
  driverId!: number;
  hasVehicle: boolean = false;

  types: Type[] = [
    {value: 1, viewValue: "STANDARD"},
    {value: 2, viewValue: "LUXURY"},
    {value: 3, viewValue: "VAN"}
  ];

  vehicleForm = new FormGroup({
    model : new FormControl('', Validators.required),
    vehicleType: new FormControl('', Validators.required),
    licenseNumber: new FormControl('', Validators.required),
    babyTransport: new FormControl(),
    petTransport: new FormControl(),
    passengerSeats: new FormControl(),
  });

  constructor(private vehicleService: VehicleService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.driverId = this.authService.getId();
  }

  ngAfterViewInit(): void{
    this.vehicleService.hasVehicleValue$.subscribe({
      next: (value) => {
        this.hasVehicle = value;
        if(this.hasVehicle){
          this.getVehicle();
        }
      }
    })
  }

  getVehicle(){
    this.vehicleService.getVehicle(this.driverId).subscribe({
      next: (result) =>{
        if(result != null){
          this.hasVehicle = true;
          this.vehicle = result;
          this.vehicleForm.patchValue({
            model: this.vehicle.model,
            vehicleType: this.vehicle.vehicleType,
            licenseNumber: this.vehicle.licenseNumber,
            passengerSeats: this.vehicle.passengerSeats,
            babyTransport: this.vehicle.babyTransport,
            petTransport: this.vehicle.petTransport
          })
        }
        
      },
      error: (err) => {}
    })
  }

  sendVehicleData(): void{
    if(this.vehicleForm.valid){
      if(this.hasVehicle){
        this.vehicleService.updateVehicle(this.driverId, <Vehicle> this.vehicleForm.value).subscribe({
          next: (result)=> {
            this.router.navigate(['/profile']);
          }
        });
      }else{
        this.vehicleService.addVehicle(this.driverId, <Vehicle> this.vehicleForm.value).subscribe({
          next: (result)=> {
            this.router.navigate(['/profile']);
          }
        });
      }
    }
  }

}
