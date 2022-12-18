import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { SearchLocationsComponent } from './search-locations/search-locations.component';



@NgModule({
  declarations: [
    MapComponent,
    SearchLocationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapComponent,
    SearchLocationsComponent
  ]
})
export class MapModule { }
