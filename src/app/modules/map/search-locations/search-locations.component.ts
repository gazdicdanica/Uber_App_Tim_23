import { Component, Input, OnInit, Optional } from '@angular/core';
import { MapService } from '../map.service';
import { Location } from '../Location';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable, map } from 'rxjs';

@Component({
  selector: 'app-search-locations',
  templateUrl: './search-locations.component.html',
  styleUrls: ['./search-locations.component.css']
})
export class SearchLocationsComponent implements OnInit {

  constructor(private mapService: MapService, private router: Router) {}

  @Input() parentName! : string;

  search = new FormGroup({
    startLoc: new FormControl('', [Validators.required]),
    endLoc: new FormControl('', [Validators.required]),
  });
  picker: any;
  time!: String;

  startSearch : any;
  endSearch : any;

  ngOnInit() {
    if(this.parentName == "main"){
      let select: any = document.getElementById('time-select');
      select.style.display = "none";
      
      this.picker = document.getElementById("time-picker"); 
      this.picker.style.display = "none";
    }
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

    if(this.startLocation == "" || this.endLocation == ""){
      alert("Please enter both start and end location!");
    }else{

      let res$ = forkJoin([this.mapService.search(this.startLocation), this.mapService.search(this.endLocation)]);
      res$.subscribe(
        { next:(res) => {
          if(res[0].length == 0 || res[1].length == 0){
            alert("Sorry, we didn't find a match for enetered address!");
            this.startLocation  = "";
            this.endLocation = "";
            return;
          }else{
            this.mapService.setStartValue(new Location(res[0][0].lon, res[0][0].lat, res[0][0].display_name));
            this.mapService.setEndValue(new Location(res[1][0].lon, res[1][0].lat, res[1][0].display_name));

            console.log(res);

            const val = {
              start: this.search.value.startLoc,
              end: this.search.value.endLoc,
              time: this.time,
            }
            this.mapService.setFormGroupValue(val);

            
            this.router.navigate(['/rideInfo']);
          }
        }}
      );
    }

    
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
