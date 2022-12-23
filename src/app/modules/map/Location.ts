export class Location{
    longitude : number;
    latitude : number;
    address : string;

    constructor(longitude: number, latitude : number, address: string){
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
    }
}