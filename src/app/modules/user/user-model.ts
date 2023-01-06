export class User{
    id: number;
    name: string;
    surname: string;
    profilePicture: string;
    email: string;
    telephoneNumber: string;
    address: string;

    constructor(id: number, name: string, surname: string, profilePic: string, email : string, address: string, phone: string){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.profilePicture = profilePic;
        this.email = email;
        this.telephoneNumber = phone;
        this.address = address;
    }
}