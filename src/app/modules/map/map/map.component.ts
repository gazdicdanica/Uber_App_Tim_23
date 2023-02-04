import { AfterViewInit, Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { Location } from '../Location';
import { BehaviorSubject, forkJoin, interval, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DriverService } from '../../services/driver/driver.service';
import { WebSocketService } from '../../services/WebSocket/WebSocket.service';
import { VehicleLocation } from '../../model/VehicleLocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
  role: any;
  currentDriverLoc!: L.Marker;
  public lat!: number;
  public lng!: number;
  stompClient: any;

  constructor(private mapService: MapService, private authService: AuthService, private driverService: DriverService, private wsService: WebSocketService){}

  ngOnInit(): void {
    this.authService.userState$.subscribe((result) => {
      this.role = result;
    });

  }

  @Output() estimationEvent = new EventEmitter<string[]>();

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

  // is onClick enabled
  private click!: boolean;

  private markers : Array<L.Marker> = new Array<L.Marker>();
  private activeDrivers: Array<L.Marker> = new Array<L.Marker>();
  private busyDrivers: Array<L.Marker> = new Array<L.Marker>();
  private panicDrivers: Array<L.Marker> = new Array<L.Marker>();
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
    iconAnchor: [22, 20],
  });

  private panic = L.icon({
    iconUrl: 'assets/images/panic.png',
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
            this.startLocation = new Location(res.lon, res.lat, res.display_name);
          }else{
            this.mapService.setEndValue(new Location(res.lon, res.lat, res.display_name));
            this.endLocation = new Location(res.lon, res.lat, res.display_name);
            this.route(this.startLocation, this.endLocation);
            const elem = <HTMLElement>document.getElementsByClassName('leaflet-routing-container leaflet-bar leaflet-control')[0];
            elem.style.background = '#EFEFEF';
          }
        });
        
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


  addVehicle(vehicle: any): void {
    if (vehicle.rideStatus == "FINISHED" && !this.checkPresentOnMap(vehicle)) {
        this.activeDrivers.push(L.marker([vehicle.vehicle.currentLocation.latitude, vehicle.vehicle.currentLocation.longitude],
          {draggable: false, icon: this.availableIcon, title: vehicle.vehicle.id}).bindTooltip("Available " + vehicle.vehicle.vehicleType.type).addTo(this.map));

    } else if (vehicle.rideStatus == "ACTIVE" && !this.checkPresentOnMap(vehicle)) {
        this.busyDrivers.push(L.marker([vehicle.vehicle.currentLocation.latitude, vehicle.vehicle.currentLocation.longitude], 
          {draggable: false, icon: this.unavailableIcon, title: vehicle.vehicle.id}).bindTooltip("Busy").addTo(this.map));

    } else if (vehicle.rideStatus == "PANIC" && !this.checkPresentOnMap(vehicle)) {
      this.panicDrivers.push(L.marker([vehicle.vehicle.currentLocation.latitude, vehicle.vehicle.currentLocation.longitude],
        {draggable: false, icon: this.panic, title: vehicle.vehicle.id}).bindTooltip("Panic " + vehicle.vehicle.vehicleType.type).addTo(this.map));

    }else if (this.checkPresentOnMap(vehicle) && vehicle.rideStatus == "ACTIVE" &&
        this.getVehicleMarkerById(vehicle.vehicle.id).getTooltip()?.getContent()?.toString().includes('Available')) {

          const index = this.activeDrivers.indexOf(this.getVehicleMarkerById(vehicle.vehicle.id));
          this.map.removeLayer(this.getVehicleMarkerById(vehicle.vehicle.id));
          this.activeDrivers.splice(index, 1);
          this.busyDrivers.push(L.marker([vehicle.vehicle.currentLocation.latitude, vehicle.vehicle.currentLocation.longitude], 
            {draggable: false, icon: this.unavailableIcon, title: vehicle.vehicle.id}).bindTooltip("Busy").addTo(this.map));

    } else if (this.checkPresentOnMap(vehicle) && vehicle.rideStatus == "FINISHED" &&
        this.getVehicleMarkerById(vehicle.vehicle.id).getTooltip()?.getContent()?.toString().includes('Busy')) {

          const index = this.busyDrivers.indexOf(this.getVehicleMarkerById(vehicle.vehicle.id));
          this.map.removeLayer(this.getVehicleMarkerById(vehicle.vehicle.id));
          this.busyDrivers.splice(index, 1);
          this.activeDrivers.push(L.marker([vehicle.vehicle.currentLocation.latitude, vehicle.vehicle.currentLocation.longitude],
            {draggable: false, icon: this.availableIcon, title: vehicle.vehicle.id}).bindTooltip("Available " + vehicle.vehicle.vehicleType.type).addTo(this.map));

    } else if (this.checkPresentOnMap(vehicle) && vehicle.rideStatus == "PANIC" &&
        this.getVehicleMarkerById(vehicle.vehicle.id).getTooltip()?.getContent()?.toString().includes('Panic')) {

          this.getVehicleMarkerById(vehicle.vehicle.id).setLatLng(new L.LatLng(vehicle.vehicle.currentLocation.latitude, vehicle.vehicle.currentLocation.longitude));
    } else {
          this.getVehicleMarkerById(vehicle.vehicle.id).setLatLng(new L.LatLng(vehicle.vehicle.currentLocation.latitude, vehicle.vehicle.currentLocation.longitude));
    }
  }

  checkPresentOnMap(vehicle: any): boolean {
      for (let driverMarker of this.activeDrivers) {
          if(driverMarker.options.title == vehicle.vehicle.id) {
            return true;
          }
      }
      for (let driverMarker of this.busyDrivers) {
        if(driverMarker.options.title == vehicle.vehicle.id) {
          return true;
        }
      }
      return false;
  }

  getVehicleMarkerById(id: string): L.Marker {
    for (let driverMarker of this.activeDrivers) {
      if (driverMarker.options.title == id) {
        return driverMarker;
      }
    }
    for (let driverMarker of this.busyDrivers) {
      if (driverMarker.options.title == id) {
        return driverMarker;
      }
    }
    console.log("You shall not pass");
    return new L.Marker(new L.LatLng(0, 0));
  }

  private makeMarker(location: Location) : L.Marker {
    return L.marker([location.latitude, location.longitude],{draggable: false});
  }


  route(start: Location, end: Location):void{
    if(this.routingControl != null){
      this.map.removeControl(this.routingControl);
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

  setDriversLocation(): void {
    if(this.stompClient == null) {
      this.stompClient = this.wsService.connect();
      let that = this;
      this.stompClient.connect({}, function() {
        that.stompClient.subscribe("/update-vehicle-location/", (message: {body: string}) => {
          let response: VehicleLocation[] = JSON.parse(message.body);
          for (let element of response) {
            if(element.driverId == that.authService.getId()) that.mapService.setEstimation(element.duration);
            else that.addVehicle(element);
            
            that.tryStyleMap();
          }
        });
      });
    }
    
  }

  ngAfterViewInit(): void {

    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    if(this.role === 'ROLE_DRIVER') {
      interval(2000).subscribe( x=> {

        this.tryStyleMap();

        this.driverService.getDriverLocation(this.driverService.getId()).subscribe({
          next: (result) => {
            if (!this.currentDriverLoc) {
              this.currentDriverLoc = L.marker(L.latLng(result.latitude, result.longitude), 
              {draggable:false, icon: this.driverIcon});
              this.currentDriverLoc.addTo(this.map);
            } else {
              this.currentDriverLoc.setLatLng(new L.LatLng(result.latitude, result.longitude));
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      });
    } else {
      this.getLocation()
    }
    this.setDriversLocation();

    L.Marker.prototype.options.icon = DefaultIcon;
    if(this.map == null){
      this.initMap();
    }

    this.registerOnClick();

    this.mapService.drawRoute$.subscribe(
      e => {
        this.drawRoute = e;
      }
    )

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
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
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

  tryStyleMap(): void {
    const mapsDecor = <HTMLElement>document.getElementsByClassName('leaflet-control-container')[0];
    if (mapsDecor != undefined) {
      mapsDecor.style.visibility = 'hidden';
    }

  }
}
