import { Route } from "./Route";
import { UserShort } from "./UserShort";

export class Favorite{
    id : number;
    favoriteName: string;
    locations: Route[];
    passengers: UserShort[];
    vehicleType : string;
    babyTransport : boolean;
    petTransport : boolean;

    constructor(id: number, name : string, locations : Route[], passengers : UserShort[], vehicleType: string,
        babyTransport: boolean, petTransport: boolean){
            this.id = id;
            this.favoriteName = name;
            this.locations = locations;
            this.passengers = passengers;
            this.vehicleType = vehicleType;
            this.babyTransport = babyTransport;
            this.petTransport = petTransport;
        }
}