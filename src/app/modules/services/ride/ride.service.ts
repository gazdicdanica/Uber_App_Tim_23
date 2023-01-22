import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { AuthService } from '../../auth/auth.service';
import { RideRequest } from '../../model/RideRequest';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) { }

  createRide(ride: RideRequest): Observable<any> {
    return this.httpClient.post<any>(environment.apiHost+"/ride", ride);
    //TODO NAPRAVITI RIDE_RESPONSE_DTO
  }
}
