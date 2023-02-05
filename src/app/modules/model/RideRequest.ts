import { Route } from "./Route"
import { User } from "./user";
import { UserShort } from "./UserShort";

export class RideRequest {
    locations: Array<Route>;
    passengers: UserShort[];
    vehicleType: string;
    scheduledTime: null | Date;
    babyTransport: boolean;
    petTransport: boolean;
    estimatedTime: number;

    constructor(loc: Route, psngr: UserShort[], vt: string, schdTime: Date | null, bT: boolean, pT: boolean, estimateTime: number) {
        this.locations = [loc];
        this.passengers = psngr;
        this.vehicleType = vt;
        this.scheduledTime = schdTime;
        this.babyTransport = bT;
        this.petTransport = pT;
        this.estimatedTime = estimateTime;
    }
}