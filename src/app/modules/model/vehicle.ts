import { Location } from "./Location";

export class Vehicle{
    id: number;
    model: string;
    vehicleType: string;
    licenseNumber: string;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;
    currentLocation: Location;

    constructor(id: number, model: string, type: string, license: string, capacity: number, babies: boolean, pets: boolean, loc : Location){
        this.model = model;
        this.vehicleType = type;
        this.licenseNumber = license;
        this.passengerSeats = capacity;
        this.babyTransport = babies;
        this.petTransport = pets;
        this.id = id;
        this.currentLocation = loc;
    }
}