import { Pipe, PipeTransform } from '@angular/core';

import { WeatherIconCode } from '#features/weather/models';

@Pipe({ name: 'weatherIcon', standalone: true })
export class WeatherIconPipe implements PipeTransform {
  public transform(iconCode?: WeatherIconCode): string {
    let iconName: string;

    if (iconCode === '01d' || iconCode === '01n') {
      iconName = 'clear';
    } else if (iconCode === '02d' || iconCode === '02n') {
      iconName = 'cloud';
    } else if (iconCode === '03d' || iconCode === '03n') {
      iconName = 'drizzle';
    } else if (iconCode === '04d' || iconCode === '04n') {
      iconName = 'drizzle';
    } else if (iconCode === '09d' || iconCode === '09n') {
      iconName = 'rain';
    } else if (iconCode === '10d' || iconCode === '10n') {
      iconName = 'rain';
    } else if (iconCode === '13d' || iconCode === '13n') {
      iconName = 'snow';
    } else iconName = 'clear';

    return `assets/img/weather-icons/${iconName}.png`;
  }
}
