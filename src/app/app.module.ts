import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigationBar/navigation-bar/navigation-bar.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { LoginComponent } from './components/login/login/login.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
    SignUpFormComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
