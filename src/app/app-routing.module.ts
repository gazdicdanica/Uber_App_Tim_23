import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignUpFormComponent } from './modules/auth/sign-up-form/sign-up-form.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './modules/auth/change-password/change-password.component';
import { ProfileComponent } from './modules/layout-module/profile/profile.component';
import { MainComponent } from './modules/layout-module/main/main.component';
import { RideInfoComponent } from './modules/layout-module/ride-info/ride-info.component';
import { NavbarComponent } from './modules/navbar/navbar/navbar.component';
import { ConfirmationComponent } from './modules/layout-module/confirmation/confirmation.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpFormComponent},
  {path: 'resetPw', component: ResetPasswordComponent},
  {path: 'changePw', component: ChangePasswordComponent},
  {path: 'signUpForm', component: SignUpFormComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'main', component: MainComponent},
  {path: 'rideInfo', component: RideInfoComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  { path: '', pathMatch: 'full', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
