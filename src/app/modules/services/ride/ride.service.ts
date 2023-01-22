import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { AuthService } from '../../auth/auth.service';
import { RideRequest } from '../../model/RideRequest';
import { Ride } from '../../model/Ride';


@Injectable({
  providedIn: 'root'
})
export class RideService {

  private rideData = new BehaviorSubject<any>(null);
  rideData$ = this.rideData.asObservable();


  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) { }

  createRide(ride: RideRequest): Observable<any> {
    return this.httpClient.post<any>(environment.apiHost+"/ride", ride);
    //TODO NAPRAVITI RIDE_RESPONSE_DTO
  }

  acceptRide(id: number) : Observable<Ride> {
    return this.httpClient.put<Ride>(environment.apiHost+"/ride/"+id + "/accept", null);
  }

  cancelRide(id: number, reason:any) : Observable<Ride>{
    return this.httpClient.put<Ride>(environment.apiHost+"/ride/"+id+"/cancel", reason);
  }

  setRide(value: Ride): void {
    this.rideData.next(value);
  }

  startRide(id: number): Observable<any> {
    return this.httpClient.put<any>(environment.apiHost+"/ride/"+id+"/start", null);
  }

  finishRide(id: number): Observable<any> {
    return this.httpClient.put<any>(environment.apiHost+"/ride/"+id+"/end", null);
  }

  panic(id: number, body: any): Observable<any> {
    return this.httpClient.put<any>(environment.apiHost+"/ride/"+id+"/panic", body);
  }
}
