import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './modules/layout-module/navigation-bar/navigation-bar.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { UnregisteredMainComponent } from './modules/layout-module/unregistered-main/unregistered-main.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignUpFormComponent } from './modules/auth/sign-up-form/sign-up-form.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './modules/auth/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    SignUpFormComponent,
    SignUpComponent,
    UnregisteredMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
