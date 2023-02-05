import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { ChangePasswordComponent } from './password/change-password/change-password.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from './auth.service';
import { ChangePwInputCodeComponent } from './password/change-pw-input-code/change-pw-input-code.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpFormComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ChangePwInputCodeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    LoginComponent,
    SignUpFormComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ]
})
export class AuthModule { }
