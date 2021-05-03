import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(distance: number): string {
    const isNumeric = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    if (distance && isNumeric(distance)) {
      let currentDistance = '0';
      let unit = 'm';
      if (distance > 1000) {
        currentDistance = (distance / 1000).toFixed(1);
        unit = 'km';
      } else {
        currentDistance = Math.floor(distance).toString();
      }
      return currentDistance + unit;
    } else {
      return '?';
    }
  }

}
