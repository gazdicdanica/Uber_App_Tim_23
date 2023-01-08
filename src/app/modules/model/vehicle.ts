export class Vehicle{
    model: string;
    vehicleType: string;
    licenseNumber: string;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;

    constructor(model: string, type: string, license: string, capacity: number, babies: boolean, pets: boolean){
        this.model = model;
        this.vehicleType = type;
        this.licenseNumber = license;
        this.passengerSeats = capacity;
        this.babyTransport = babies;
        this.petTransport = pets;
    }
}