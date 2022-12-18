import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { SearchLocationsComponent } from './search-locations/search-locations.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent,
    SearchLocationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MapComponent,
    SearchLocationsComponent
  ]
})
export class MapModule { }
