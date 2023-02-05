import { Duration } from "date-fns";

export class VehicleLocation{
    driverId : number;
    driverEmail : string;
    rideStatus : string;
    duration : string;


    constructor(id : number, email : string, status : string, duration : string){
        this.rideStatus = status;
        this.driverEmail = email;
        this.driverId = id;
        this.duration = duration;
    }
}