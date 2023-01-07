export class Vehicle{
    id: number;
    model: string;
    vehicleType: string;
    licenseNumber: string;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;

    constructor(id: number, model: string, type: string, license: string, capacity: number, babies: boolean, pets: boolean){
        this.id = id;
        this.model = model;
        this.vehicleType = type;
        this.licenseNumber = license;
        this.passengerSeats = capacity;
        this.babyTransport = babies;
        this.petTransport = pets;
    }
}