import { Component, Input } from '@angular/core';
import { MapService } from '../map.service';
import { Location } from '../Location';

@Component({
  selector: 'app-search-locations',
  templateUrl: './search-locations.component.html',
  styleUrls: ['./search-locations.component.css']
})
export class SearchLocationsComponent {

  constructor(private mapService: MapService) {}

  @Input()
  startLocation! : string;
  @Input()
  endLocation! : string;


  sendSearchValues() {

    this.mapService.search(this.startLocation).subscribe({
      next:(result) => {
        this.mapService.setStartValue(new Location(result[0].lon, result[0].lat, result[0].display_name));
      }
    });

    this.mapService.search(this.endLocation).subscribe({
      next:(result) => {
        this.mapService.setEndValue(new Location(result[0].lon, result[0].lat, result[0].display_name));
      }
    });
    
  }

}
