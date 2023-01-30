import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { AuthService } from '../../auth/auth.service';
import { RideRequest } from '../../model/RideRequest';
import { Ride } from '../../model/Ride';
import { VehicleType } from '../../model/vehicleType';
import { Location } from '../../model/Location';
import { Favorite } from '../../model/Favorite';


@Injectable({
  providedIn: 'root'
})
export class RideService {

  private rideData = new BehaviorSubject<any>(null);
  rideData$ = this.rideData.asObservable();

  private start = new BehaviorSubject<Location>(new Location(0, 0, ''));
  start$ = this.start.asObservable();

  private end = new BehaviorSubject<Location>(new Location(0, 0, ''));
  end$ = this.end.asObservable();

  private favorite = new BehaviorSubject<Favorite>(new Favorite(0, "", [], [], "", false, false));
  favorite$ = this.favorite.asObservable();


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

  setFavorite(value : Favorite) : void{
    this.favorite.next(value);
  }

  withdrawRide(id: number) : Observable<Ride>{
    return this.httpClient.put<any>(environment.apiHost + "/ride/ " + id + "/withdraw", null);
  }

  startRide(id: number): Observable<Ride> {
    return this.httpClient.put<any>(environment.apiHost+"/ride/"+id+"/start", null);
  }

  finishRide(id: number): Observable<Ride> {
    return this.httpClient.put<any>(environment.apiHost+"/ride/"+id+"/end", null);
  }

  panic(id: number, body: any): Observable<any> {
    return this.httpClient.put<any>(environment.apiHost+"/ride/"+id+"/panic", body);
  }

  setStart(val: Location) {
    this.start.next(val);
  }

  setEnd(val: Location) {
    this.end.next(val);
  }

  getRides(id: number, role: any, pageable: any): Observable<any> {
    if(role == 'ROLE_DRIVER'){
      return this.httpClient.get(environment.apiHost+"/driver/"+id+"/ride?page="+pageable.page+"&size="+pageable.size+"&sort="+pageable.sort);
    } else if(role == 'ROLE_USER') {
      return this.httpClient.get(environment.apiHost+"/passenger/"+id+"/ride?page="+pageable.page+"&size="+pageable.size+"&sort="+pageable.sort);
    } else {
      throw new Error('A eo ne znam kako, nema role')
    }
  }

  getRideCount(id: number): Observable<any> {
    return this.httpClient.get(environment.apiHost+"/user/"+id+"/rideCount");
  }

  getRideById(id: number): Observable<any> {
    return this.httpClient.get(environment.apiHost+"/ride/"+id);
  }

  addFavorite(data : any) : Observable<any>{
    return this.httpClient.post(environment.apiHost + "/ride/favorites", data);
  }

  getFavorites() : Observable<Favorite[]>{
    return this.httpClient.get<Favorite[]>(environment.apiHost + "/ride/favorites");
  }

  getRidesByDate(start: Date, end : Date) : Observable<any>{
    start.setHours(0, -start.getTimezoneOffset(), 0, 0);
    end.setHours(0, -end.getTimezoneOffset(),0, 0);
    let params = new HttpParams()
    .set("start", start.toISOString()).set("end", end.toISOString());

    return this.httpClient.get(environment.apiHost + "/report", {params : params});
  }
}
