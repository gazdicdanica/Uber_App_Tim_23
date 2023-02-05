import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RideReview } from '../../model/RideReview';
import { environment } from 'src/enviroments/environment';
import { Review } from '../../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient : HttpClient) { }

  findReviewForRide(rideId : number) : Observable<RideReview> {
    return this.httpClient.get<RideReview>(environment.apiHost + "/review/" + rideId);
  }

  createReviewVehicle(review: Review, rideId: number) : Observable<Review> {
    return this.httpClient.post<Review>(environment.apiHost + "/review/" + rideId + "/vehicle", review);
  }

  createReviewDriver(review: Review, rideId: number) : Observable<Review> {
    return this.httpClient.post<Review>(environment.apiHost + "/review/" + rideId + "/driver", review);
  }
}
