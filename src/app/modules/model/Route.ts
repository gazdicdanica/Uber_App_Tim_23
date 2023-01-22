import { Location } from "./Location";

export class Route{
    departure: Location;
    destination: Location;


    constructor(departure: Location, destination: Location){
        this.departure = departure;
        this.destination = destination;
    }
}