import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { MapModule } from '../map/map.module';
import { RideInfoComponent } from './ride-info/ride-info.component';
import { VehicleRideComponent } from './vehicle-ride/vehicle-ride.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AuthModule } from '../auth/auth.module';
import { ModelModule } from '../model/model.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChangePersonalInfoComponent } from './change-personal-info/change-personal-info.component';
import { DriverDataComponent } from './driver-data/driver-data.component';
import { VehicleModule } from '../vehicle/vehicle.module';
import { DriverDocumentComponent } from './driver-document/driver-document.component';
import { DocumentsComponent } from './documents/documents.component';
import { NewRideDialogComponent } from './new-ride-dialog/new-ride-dialog.component';
import { DeclineDialogComponent } from './decline-dialog/decline-dialog.component';
import { InRideComponent } from './in-ride/in-ride-Driver/in-ride.component';
import { WaitingDialogComponent } from './waiting-dialog/waiting-dialog.component';
import { InRidePassengerComponent } from './in-ride/in-ride-passenger/in-ride-passenger.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PanicDialogComponent } from './in-ride/panic-dialog/panic-dialog.component';
import { RideDetailsComponent } from './ride-details/ride-details.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { FavoriteDialogComponent } from './favorite-dialog/favorite-dialog.component';
import { FavoriteRidesComponent } from './favorite-rides/favorite-rides.component';


@NgModule({
  declarations: [
    MainComponent,
    RideInfoComponent,
    VehicleRideComponent,
    MainComponent,
    SideNavbarComponent,
    PersonalInfoComponent,
    ProfileComponent,
    ConfirmationComponent,
    ChangePersonalInfoComponent,
    DriverDataComponent,
    DriverDocumentComponent,
    DocumentsComponent,
    NewRideDialogComponent,
    DeclineDialogComponent,
    InRideComponent,
    InRidePassengerComponent,
    RideHistoryComponent,
    WaitingDialogComponent,
    InRidePassengerComponent,
    PanicDialogComponent,
    RideDetailsComponent,
    ReviewDialogComponent,
    FavoriteDialogComponent,
    FavoriteRidesComponent
  ],
  imports: [
    BrowserModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    MapModule,
    AuthModule,
    ModelModule,
    ReactiveFormsModule,
    FormsModule,
    VehicleModule
  ],
  exports: [SideNavbarComponent, PersonalInfoComponent, ProfileComponent],
  entryComponents: [NewRideDialogComponent]
})
export class LayoutModuleModule { }
