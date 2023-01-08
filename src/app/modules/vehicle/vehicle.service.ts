import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { Vehicle } from '../model/vehicle';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private hasVehicle$ = new BehaviorSubject<boolean>(false);
  hasVehicleValue$ = this.hasVehicle$.asObservable();

  setHasVehicle(value: boolean){
    this.hasVehicle$.next(value);
  }

  getVehicle(driverId: number) : Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + '/driver/' + driverId + '/vehicle');
  }

  updateVehicle(driverId: number, vehicle: Vehicle) : Observable<Vehicle>{
    return this.http.put<Vehicle>(environment.apiHost+"/driver/"+driverId+"/vehicle", vehicle);
  }

  addVehicle(driverId: number, vehicle: Vehicle) : Observable<Vehicle>{
    return this.http.post<Vehicle>(environment.apiHost+"/driver/"+driverId+"/vehicle", vehicle);
  }
}
