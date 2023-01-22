import { Component, Input } from '@angular/core';
import { MapService } from '../map.service';
import { Location } from '../Location';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-locations',
  templateUrl: './search-locations.component.html',
  styleUrls: ['./search-locations.component.css']
})
export class SearchLocationsComponent {

  constructor(private mapService: MapService) {}

  search = new FormGroup({
    startLoc: new FormControl('', [Validators.required]),
    endLoc: new FormControl('', [Validators.required]),
  });
  picker: any;
  time!: String;

  ngOnInit() {
    this.picker = document.getElementById("time-picker"); 
    this.picker.style.display = "none";
    
    let select: any = document.getElementById('time-select');
    select.style.display = "none";
  }


  @Input()
  startLocation! : string;
  @Input()
  endLocation! : string;

  createTime(): void {
    let select: any = document.getElementById('time-select');
    this.picker = document.getElementById("time-picker"); 
    select.style.display = "none";
    this.picker.style.display = "flex";

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.picker.value = now.toISOString().slice(0,16);
    this.picker.min = now.toISOString().slice(0,16);
    let hours = new Date(now.getTime()+ 2*60*60*1000);
    this.picker.max = hours.toISOString().slice(0, 16);
  }

  sendSearchValues(): void {    
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
    const val = {
      start: this.search.value.startLoc,
      end: this.search.value.endLoc,
      time: this.time,
    }
    this.mapService.setFormGroupValue(val);
  }

  pickTime(): void {
    let x: any = document.getElementById('time-picker');
    if (x != undefined) {
      this.time = x.value; 
      const val = {
        start: this.search.value.startLoc,
        end: this.search.value.endLoc,
        time: this.time,
      }
      this.mapService.setFormGroupValue(val);
    }
  }
}
