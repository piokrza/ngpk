import { WeatherIconCode, WeatherIconName } from '@ngpk/weather/model';

export const iconCodeToIconName: Record<WeatherIconCode, WeatherIconName> = {
  '01d': 'clear',
  '01n': 'clear',
  '02d': 'cloud',
  '02n': 'cloud',
  '03d': 'drizzle',
  '03n': 'drizzle',
  '04d': 'drizzle',
  '04n': 'drizzle',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '13d': 'snow',
  '13n': 'snow',
};
