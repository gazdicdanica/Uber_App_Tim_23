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

  @Output() estimationEvent = new EventEmitter<string[]>();

  private availableVehicles : L.LatLngTuple[] = [[45.25949, 19.8377], [45.25466, 19.81555], [45.25010, 19.8112], [45.2407, 19.84817]];
  private unavailableVehicles : L.LatLngTuple[] = [[45.2436, 19.831], [45.2552, 19.8495], [45.29498, 19.8227]];

  private _startLocation = new BehaviorSubject<Location>(new Location(0,0,""));
  private _endLocation= new BehaviorSubject<Location>(new Location(0,0,""));


  private routingControl!: L.Routing.Control;

  private distance: number = 0;
  private timeInMinutes: number = 0;

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

  private drawRoute:boolean = false;

  private markers : Array<L.Marker> = new Array<L.Marker>();
  private clicks : number = 0;

  private map!: L.Map;

  private availableIcon = L.icon({
    iconUrl: 'assets/images/available-car.png',
    iconSize: [40,40],
    iconAnchor: [22, 94]
  })

  private unavailableIcon = L.icon({
    iconUrl: 'assets/images/unavailable-car.png',
    iconSize: [40,40],
    iconAnchor: [22, 20]
  })


  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private mapService: MapService){}

  private initMap() : void{

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [45.25327, 19.8227],
      zoom: 14
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
      this.clicks+=1;
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        if(this.clicks % 2 === 1){
          if (this.routingControl != null){
            this.routingControl.remove();
          }
          this.mapService.setStartValue(new Location(res.lon, res.lat, res.display_name));
          this.mapService.setEndValue(new Location(0,0,""));
          this.startLocation = new Location(res.lon, res.lat, res.display_name);
        }else{
          this.mapService.setEndValue(new Location(res.lon, res.lat, res.display_name));
          this.endLocation = new Location(res.lon, res.lat, res.display_name);
          this.route(this.startLocation, this.endLocation);
        }
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      
    });
  }

  addMarker(latitude: number, longitude: number): void{
    if(this.markers.length == 2){
      let m : L.Marker = <L.Marker>this.markers.shift();
      this.map.removeLayer(m);
    }
    this.markers.push(L.marker([latitude, longitude]).addTo(this.map));
  }

  private makeMarker(location: Location) : L.Marker {
    return L.marker([location.latitude, location.longitude],{draggable: false});
  }


  route(start: Location, end: Location):void{
    if(this.routingControl != null){
      this.routingControl.remove();
    }
    this.routingControl = L.Routing.control({waypoints: [L.marker([start.latitude, start.longitude]).getLatLng(),
       L.marker([end.latitude, end.longitude]).getLatLng()], show: false, 
       plan: L.Routing.plan([this.makeMarker(this.startLocation).getLatLng(), this.makeMarker(this.endLocation).getLatLng()],
       {createMarker: function(i: number, waypoint: L.Routing.Waypoint){
        return L.marker(waypoint.latLng, {draggable:false})
       }, draggableWaypoints: false}), addWaypoints:false
       });
    this.routingControl.addTo(this.map).on('routesfound',  (e) => {
      this.distance = ((e.routes[0].summary.totalDistance) / 1000);
      this.timeInMinutes = ((e.routes[0].summary.totalTime) % 3600 / 60);

      this.estimationEvent.emit([this.distance.toPrecision(2), this.timeInMinutes.toPrecision(2)]);
    });

    this.routingControl.hide();
  }


  private addCarMarkers() : void{
    for(let carLatLng of this.availableVehicles){
      L.marker(carLatLng, {draggable:false, icon: this.availableIcon}).addTo(this.map);
    }

    for(let carLatLng of this.unavailableVehicles){
      L.marker(carLatLng, {draggable: false, icon: this.unavailableIcon}).addTo(this.map);
    }
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
        this.addMarker(x.latitude, x.longitude);
      }
    );

    this._endLocation.subscribe(
      x => {
        this.addMarker(x.latitude, x.longitude);
      }
    );

    this.mapService.drawRoute$.subscribe(
      e => {
        this.drawRoute = e;
        if(this.drawRoute)
          this.route(this.startLocation, this.endLocation);
      }
    )

    this.addCarMarkers();
  }

}
