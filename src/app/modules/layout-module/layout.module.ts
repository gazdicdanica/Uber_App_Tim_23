import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { MapModule } from '../map/map.module';
import { RideInfoComponent } from './ride-info/ride-info.component';
import { VehicleRideComponent } from './vehicle-ride/vehicle-ride.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    MainComponent,
    RideInfoComponent,
    VehicleRideComponent,
    MainComponent,
    SideNavbarComponent,
    PersonalInfoComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    MapModule
  ],
  exports: [NavigationBarComponent, SideNavbarComponent, PersonalInfoComponent, ProfileComponent]
})
export class LayoutModuleModule { }
