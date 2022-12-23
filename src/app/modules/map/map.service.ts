import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from './Location';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private startLocationValue$ = new BehaviorSubject<Location>(new Location(0,0,""));
  startSelectedValue$ = this.startLocationValue$.asObservable();

  private endLocationValue$ = new BehaviorSubject<Location>(new Location(0,0,""));
  endSelectedValue$ = this.endLocationValue$.asObservable();

  constructor(private http: HttpClient) { }

  setStartValue(value: Location){
    this.startLocationValue$.next(value);
    // this.endSelectedValue$.subscribe({
    //   next:(res) => {
    //     console.log(res);
    //   }
    // });
  }

  setEndValue(value: Location){
    this.endLocationValue$.next(value);
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
}
