import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-ride',
  templateUrl: './vehicle-ride.component.html',
  styleUrls: ['./vehicle-ride.component.css']
})
export class VehicleRideComponent {

  @Input()
  type!: string;
  @Input()
  price!: number;

  ngOnInit(){
    console.log(this.type);
  }

}
