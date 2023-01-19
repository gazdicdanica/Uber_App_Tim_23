import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AuthModule } from '../auth/auth.module';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VehicleInfoComponent,
    VehicleFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    VehicleInfoComponent
  ]
})
export class VehicleModule { }
