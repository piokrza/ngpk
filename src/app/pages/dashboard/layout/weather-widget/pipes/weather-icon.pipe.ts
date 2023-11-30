import { Pipe, PipeTransform } from '@angular/core';

import { WeatherIconCode, WeatherIconName } from '#layout/weather-widget/models';

@Pipe({ name: 'weatherIcon', standalone: true })
export class WeatherIconPipe implements PipeTransform {
  private setIconName(iconCode?: WeatherIconCode): WeatherIconName {
    switch (iconCode) {
      case '01d':
      case '01n':
        return 'clear';
      case '02d':
      case '02n':
        return 'cloud';
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return 'drizzle';
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return 'rain';
      case '13d':
      case '13n':
        return 'snow';
      default:
        return 'clear';
    }
  }

  public transform(iconCode?: WeatherIconCode): string {
    return `assets/img/weather-icons/${this.setIconName(iconCode)}.png`;
  }
}
