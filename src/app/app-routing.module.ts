import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignUpFormComponent } from './modules/auth/sign-up-form/sign-up-form.component';
import { ResetPasswordComponent } from './modules/auth/password/reset-password/reset-password.component';
import { ChangePasswordComponent } from './modules/auth/password/change-password/change-password.component';
import { ProfileComponent } from './modules/layout-module/profile/profile.component';
import { MainComponent } from './modules/layout-module/main/main.component';
import { RideInfoComponent } from './modules/layout-module/ride-info/ride-info.component';
import { ConfirmationComponent } from './modules/layout-module/confirmation/confirmation.component';
import { ChangePersonalInfoComponent } from './modules/layout-module/change-personal-info/change-personal-info.component';
import { VehicleFormComponent } from './modules/vehicle/vehicle-form/vehicle-form.component';
import { DocumentsComponent } from './modules/layout-module/documents/documents.component';
import { LoginGuard } from './modules/auth/guard/login.guard';
import { ChangePwInputCodeComponent } from './modules/auth/password/change-pw-input-code/change-pw-input-code.component';
import { InRideComponent } from './modules/layout-module/in-ride/in-ride-Driver/in-ride.component';
import { InRidePassengerComponent } from './modules/layout-module/in-ride/in-ride-passenger/in-ride-passenger.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent,
  canActivate: [LoginGuard] },
  {path: 'signUp', component: SignUpFormComponent},
  {path: 'resetPw', component: ResetPasswordComponent},
  {path: 'changePw', component: ChangePasswordComponent},
  {path: 'signUpForm', component: SignUpFormComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'main', component: MainComponent},
  {path: 'rideInfo', component: RideInfoComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  {path: 'changePersonalInfo', component: ChangePersonalInfoComponent},
  {path: 'vehicleForm', component: VehicleFormComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'resetPwViaCode', component: ChangePwInputCodeComponent},
  {path: 'inRide', component: InRideComponent},
  {path: 'psngrInRide', component: InRidePassengerComponent},
  { path: '', pathMatch: 'full', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
