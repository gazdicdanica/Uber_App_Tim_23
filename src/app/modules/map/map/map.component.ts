import { AfterViewInit, Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { Location } from '../Location';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  
  private _startLocation = new BehaviorSubject<Location>(new Location(0,0,""));
  private _endLocation= new BehaviorSubject<Location>(new Location(0,0,""));

  @Input() set startLocation(value: Location){
    this._startLocation.next(value);
  }

  get startLocation(){
    return this._startLocation.getValue();
  }

  @Input() set endLocation(value: Location){
    this._endLocation.next(value);
  }

  get endLocation(){
    return this._endLocation.getValue();
  }

  private markerNum: number = 0;

  private map!: L.Map;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private mapService: MapService){}

  private initMap() : void{

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [45.2496, 19.8227],
      zoom: 13
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
  }

  //TODO Fill input fields with results of reverse search
  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        if(this.markerNum == 0){
          this.mapService.setStartValue(res.display_name);
        }else{
          this.mapService.setEndValue(res.display_name);
        }
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      const mp = new L.Marker([lat, lng]).addTo(this.map);
    });
    this.markerNum+=1;
  }

  addMarker(location : Location): void{
    L.marker([location.latitude, location.longitude], {draggable:true}).addTo(this.map);
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    if(this.map ==null){
      this.initMap();
    }

    this.registerOnClick();

    this._startLocation.subscribe(
      x => {
        this.addMarker(x);
      }
    )

    this._endLocation.subscribe(
      x=> {
        this.addMarker(x);
      }
    )
    
  }


}
