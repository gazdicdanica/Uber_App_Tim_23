import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../../map/Location';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.component.html',
  styleUrls: ['./ride-info.component.css']
})
export class RideInfoComponent implements OnInit{

  startLocation! : Location;
  endLocation! : Location;

  constructor(private mapService: MapService, private router:Router) {}

  ngOnInit():void{

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.mapService.startSelectedValue$.subscribe((value) => {
      this.startLocation = value;
    });

    this.mapService.endSelectedValue$.subscribe((value) => {
      this.endLocation = value;
    });

    
  }


}
