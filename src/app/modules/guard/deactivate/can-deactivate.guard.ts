import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InRideComponent } from '../../layout-module/in-ride/in-ride-Driver/in-ride.component';
import { InRidePassengerComponent } from '../../layout-module/in-ride/in-ride-passenger/in-ride-passenger.component';

@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard implements CanDeactivate<InRidePassengerComponent> {
  canDeactivate(
    component: InRidePassengerComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }

  

  
}
