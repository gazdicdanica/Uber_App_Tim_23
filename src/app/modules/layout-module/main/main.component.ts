import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map/map.service';
import { Router } from '@angular/router';
import { Location } from '../../map/Location';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
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
