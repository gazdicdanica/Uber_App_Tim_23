import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AuthModule } from './modules/auth/auth.module';
import { LayoutModuleModule } from './modules/layout-module/layout.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from './modules/map/map.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { Interceptor } from './modules/auth/interceptor/interceptor.interceptor';
import { CanDeactivateGuard } from './modules/guard/deactivate/can-deactivate.guard';

@NgModule({
  declarations: [
    AppComponent,
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
    MapModule,
    NavbarModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
