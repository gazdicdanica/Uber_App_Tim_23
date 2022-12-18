import { Component, EventEmitter, Output } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-search-locations',
  templateUrl: './search-locations.component.html',
  styleUrls: ['./search-locations.component.css']
})
export class SearchLocationsComponent {

  constructor(private mapService: MapService) {}

  startLocation='';
  endLocation='';
  sendSearchValues() {

    let start;
    let end;

    this.mapService.search(this.startLocation).subscribe({
      next: (result) => {
        this.mapService.setStartValue(result);
      }
    });

    this.mapService.search(this.endLocation).subscribe({
      next: (result) => {
        this.mapService.setEndValue(result);
      }
    });

    
  }

}
