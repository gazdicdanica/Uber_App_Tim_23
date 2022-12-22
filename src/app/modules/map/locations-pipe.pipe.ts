import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationsPipe'
})
export class LocationsPipePipe implements PipeTransform {

  transform(value: string): string {
    let searchResult = value.split(", ");
    let number = searchResult[0];
    let street = searchResult[1];
    return street + " " + number;
  }

}
