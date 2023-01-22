import { Route } from "./Route";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export class Ride{
    id : number;
    totalCost: number;
    driver: User;
    estimatedTimeInMinutes: number;
    locations: Route[];
    passengers: User[];
    scheduledTime: Date;
    totalDistance: number;


    constructor(id: number, totalCost: number, driver: User, timeE: number, locations: Route[], passengers: User[], timeS: Date, totalDistance: number){
        this.driver = driver;
        this.estimatedTimeInMinutes = timeE;
        this.totalCost = totalCost;
        this.locations = locations;
        this.id = id;
        this.passengers = passengers;
        this.scheduledTime = timeS;
        this.totalDistance = totalDistance;
    }
}