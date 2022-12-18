import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { UnregisteredMainComponent } from './unregistered-main/unregistered-main.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { MapModule } from '../map/map.module';



@NgModule({
  declarations: [
    NavigationBarComponent,
    UnregisteredMainComponent,
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
