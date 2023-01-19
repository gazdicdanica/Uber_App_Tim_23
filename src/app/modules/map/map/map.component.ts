import { AfterViewInit, Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { Location } from '../Location';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { SelectorContext } from '@angular/compiler';
import { AuthService } from '../../auth/auth.service';
import { DriverService } from '../../services/driver/driver.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  role: any;
  currentDriverLoc!: Location;
  public lat!: number;
  public lng!: number;

  constructor(private mapService: MapService, private authService: AuthService, private driverService: DriverService){}


  ngOnInit(): void {
    this.authService.userState$.subscribe((result) => {
      this.role = result;
    });
  }

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

  private drawRoute!:boolean;

  private markers : Array<L.Marker> = new Array<L.Marker>();
  private clicks : number = 0;

  private map!: L.Map;

  private availableIcon = L.icon({
    iconUrl: 'assets/images/available-car.png',
    iconSize: [40,40],
    iconAnchor: [22, 20]
  })

  private unavailableIcon = L.icon({
    iconUrl: 'assets/images/unavailable-car.png',
    iconSize: [40,40],
    iconAnchor: [22, 20]
  })

  private driverIcon = L.icon({
    iconUrl: 'assets/images/driverLocation.png',
    iconSize: [40,40],
    iconAnchor: [22, 20]
  });

  private passengerIcon = L.icon({
    iconUrl: 'assets/images/passengerLocation.png',
    iconSize: [40,40],
    iconAnchor: [22, 20]
  });


  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  private initMap() : void{

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [45.25327, 19.8227],
      zoom: 14,
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
    const elem = <HTMLElement>document.getElementsByClassName('leaflet-bottom leaflet-right')[0];
    elem.style.visibility = 'hidden';
  }

  //TODO Fill input fields with results of reverse search
  registerOnClick(): void {
    if(this.role != 'ROLE_DRIVER'){
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
            const elem = <HTMLElement>document.getElementsByClassName('leaflet-routing-container leaflet-bar leaflet-control')[0];
            elem.style.background = '#EFEFEF';
          }
        });
        console.log(
          'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
        );
        
      });
  }
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

    if(this.markers.length > 0){
      for(let marker of this.markers){
        this.map.removeLayer(marker);
      }
    }

    this.routingControl = L.Routing.control({waypoints: [L.marker([start.latitude, start.longitude]).getLatLng(),
       L.marker([end.latitude, end.longitude]).getLatLng()],
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

    if(this.role === 'ROLE_DRIVER') {
      this.driverService.getDriverLocation(this.driverService.getId()).subscribe({
        next: (result) => {
          this.currentDriverLoc = result;
          L.marker(L.latLng(result.latitude, result.longitude), 
          {draggable:false, icon: this.driverIcon}).addTo(this.map);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
        this.getLocation()
    }

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
        if(this.drawRoute && this.startLocation.latitude !== 0 && this.endLocation.latitude !== 0){
          this.route(this.startLocation, this.endLocation);
        }
      }
    );

    this.mapService.drawRoute$.subscribe(
      e => {
        this.drawRoute = e;
      }
    )

    this.addCarMarkers();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          L.marker(L.latLng(this.lat, this.lng), 
          {draggable:false, icon: this.driverIcon}).addTo(this.map);
        } else{
          alert("Geolocation found no location.");          
        }
      },
        (error: GeolocationPositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
