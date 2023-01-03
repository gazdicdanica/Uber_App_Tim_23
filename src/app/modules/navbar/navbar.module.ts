import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarPassengerComponent } from './navbar-passenger/navbar-passenger.component';
import { NavbarDriverComponent } from './navbar-driver/navbar-driver.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/infrastructure/material.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarPassengerComponent,
    NavbarDriverComponent,
    NavbarUserComponent,
  ],
  exports:[
    NavbarDriverComponent,
    NavbarPassengerComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    RouterModule
  ]
})
export class NavbarModule { }
