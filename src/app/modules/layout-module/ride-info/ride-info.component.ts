import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.component.html',
  styleUrls: ['./ride-info.component.css']
})
export class RideInfoComponent implements OnInit{

  startLocation! : string;
  endLocation!: string;

  constructor(private mapService : MapService) {}
  
  ngOnInit(): void {
    this.mapService.startSelectedValue$.subscribe((value) => {
        this.startLocation = value;
    });

    this.mapService.endSelectedValue$.subscribe((value) => {
      this.endLocation = value;
    });
  }

}
