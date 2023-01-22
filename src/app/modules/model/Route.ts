import { Location } from '../model/Location';

export class Route {
    departure: Location;
    destination: Location;
    distance: number;

    constructor(departure: Location, destination: Location, distance: number) {
        this.departure = departure;
        this.destination = destination;
        this.distance = distance;
    }
}