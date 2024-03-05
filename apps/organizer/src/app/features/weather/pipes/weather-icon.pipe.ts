import { Pipe, PipeTransform } from '@angular/core';

import { iconCodeToIconName } from '#app/features/weather/constants';
import { WeatherIconCode } from '#app/features/weather/models';

@Pipe({ name: 'weatherIcon', standalone: true })
export class WeatherIconPipe implements PipeTransform {
  transform(iconCode: WeatherIconCode): string {
    return `assets/img/weather-icons/${iconCodeToIconName[iconCode] ?? 'clear'}.png`;
  }
}
