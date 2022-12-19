import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  constructor(private mapService: MapService) {}


  ngOnInit(): void {
    // this.mapService.startSelectedValue$.subscribe((value) => {
    //   console.log(value);    
    // });

    // this.mapService.endSelectedValue$.subscribe((value) => {
    //   console.log(value);
    // });
  }

}
