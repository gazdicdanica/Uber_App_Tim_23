import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from './Location';
import { Ride } from '../model/Ride';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private startLocationValue$ = new BehaviorSubject<Location>(new Location(0,0,""));
  startSelectedValue$ = this.startLocationValue$.asObservable();

  private endLocationValue$ = new BehaviorSubject<Location>(new Location(0,0,""));
  endSelectedValue$ = this.endLocationValue$.asObservable();

  private drawRoute = new BehaviorSubject<boolean>(false);
  drawRoute$ = this.drawRoute.asObservable();

  private formGroupValue = new BehaviorSubject<any>(null);
  formGroupObservable = this.formGroupValue.asObservable();

  private estimation = new BehaviorSubject<string> ("");
  estimation$ = this.estimation.asObservable();
  
  constructor(private http: HttpClient) { }

  setDrawRoute(value: boolean){
    this.drawRoute.next(value);
  }

  setStartValue(value: Location){
    this.startLocationValue$.next(value);
  }

  setEndValue(value: Location){
    console.log(value);
    this.endLocationValue$.next(value);
  }

  setFormGroupValue(value: any){
    this.formGroupValue.next(value);
  }

  setEstimation(value : string){
    this.estimation.next(value);
  }

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }

  getAllActiveRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost+"/ride/active");
  }
}
