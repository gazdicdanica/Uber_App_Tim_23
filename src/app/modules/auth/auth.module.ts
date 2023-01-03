import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    SignUpFormComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
    SignUpFormComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ]
})
export class AuthModule { }
