export class VehicleType{
    id: number;
    type: string;
    price: number;

    constructor(id: number, vehicleType: string, price: number){
        this.id = id;
        this.price = price;
        this.type = vehicleType;
    }
}