import { Vehicle } from "./vehicle";

export interface Ride{
    id: number;
    routeJSON: string;
    rideStatus: number;
    vehicle: Vehicle;
}