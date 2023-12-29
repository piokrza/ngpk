import { Pipe, PipeTransform } from '@angular/core';

import { iconCodeToIconName } from '#weather-widget/constants';
import { WeatherIconCode } from '#weather-widget/models';

@Pipe({ name: 'weatherIcon', standalone: true })
export class WeatherIconPipe implements PipeTransform {
  public transform(iconCode: WeatherIconCode): string {
    return `assets/img/weather-icons/${iconCodeToIconName[iconCode] ?? 'clear'}.png`;
  }
}
