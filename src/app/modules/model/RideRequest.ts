import { Route } from "./Route"
import { User } from "./user";
import { UserShort } from "./UserShort";

export class RideRequest {
    locations: Array<Route>;
    passengers: UserShort[];
    vehicleType: string;
    scheduleTime: Date;
    babyTransport: boolean;
    petTransport: boolean;
    estimatedTime: number;

    constructor(loc: Route, psngr: UserShort[], vt: string, schdTime: Date, bT: boolean, pT: boolean, estimateTime: number) {
        this.locations = [loc];
        this.passengers = psngr;
        this.vehicleType = vt;
        this.scheduleTime = schdTime;
        this.babyTransport = bT;
        this.petTransport = pT;
        this.estimatedTime = estimateTime;
    }
}