import { Review } from "./review";

export class RideReview{
    vehicleReviews: Review[];
    driverReviews : Review[];

    constructor(vr : Review[], dr: Review[]){
        this.vehicleReviews = vr;
        this.driverReviews = dr;
    }
}