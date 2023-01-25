import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RideReview } from '../../model/RideReview';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient : HttpClient) { }

  findReviewForRide(rideId : number) : Observable<RideReview> {
    return this.httpClient.get<RideReview>(environment.apiHost + "/review/" + rideId);
  }
}
