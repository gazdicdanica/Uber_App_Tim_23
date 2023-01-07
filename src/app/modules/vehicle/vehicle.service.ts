import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { Vehicle } from '../model/vehicle';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicle(driverId: number) : Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + '/driver/' + driverId + '/vehicle');
  }
}
