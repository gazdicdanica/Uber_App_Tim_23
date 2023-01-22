import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Ride } from '../../model/Ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private httpClient: HttpClient) { }

  acceptRide(id: number) : Observable<Ride> {
    return this.httpClient.put<Ride>(environment.apiHost+"/ride/"+id + "/accept", null);
  }
}
