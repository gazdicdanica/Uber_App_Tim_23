export class Document{
    name : string;
    documentImage : string;
    driverId : number;

    constructor(name: string, file: string, id : number){
        this.name = name;
        this.documentImage = file;
        this.driverId = id;
    }
}


