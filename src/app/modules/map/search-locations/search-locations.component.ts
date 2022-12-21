import { Component, Input } from '@angular/core';
import { MapService } from '../map.service';

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
    this.mapService.setStartValue(this.startLocation);

    this.mapService.setEndValue(this.endLocation);
    
  }

}
