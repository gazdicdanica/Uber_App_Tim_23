import { UserShort } from "./UserShort";

export class Review{
    id: number;
    rating: number;
    comment: string;
    passenger: UserShort;
    
    constructor(id: number, rating: number, comment: string, passenger: UserShort){
        this.comment = comment;
        this.id = id;
        this.rating = rating;
        this.passenger = passenger;
    }
}