import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AuthModule } from './modules/auth/auth.module';
import { LayoutModuleModule } from './modules/layout-module/layout.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from './modules/map/map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModuleModule,
    AuthModule,
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
