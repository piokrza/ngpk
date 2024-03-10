import { Pipe, PipeTransform } from '@angular/core';

import { iconCodeToIconName } from '@ngpk/weather/constant';
import { WeatherIconCode } from '@ngpk/weather/model';

@Pipe({ name: 'weatherIcon', standalone: true })
export class WeatherIconPipe implements PipeTransform {
  transform(iconCode: WeatherIconCode): string {
    return `assets/img/weather-icons/${iconCodeToIconName[iconCode] ?? 'clear'}.png`;
  }
}
