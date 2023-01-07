import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    VehicleInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule
  ],
  exports: [
    VehicleInfoComponent
  ]
})
export class VehicleModule { }
