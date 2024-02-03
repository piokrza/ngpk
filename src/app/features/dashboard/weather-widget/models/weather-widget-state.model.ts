import { IGeolocation, WeatherResponse } from '#weather-widget/models';

export interface WeatherWidgetStateModel {
  isLoading: boolean;
  errorMessage: string | null;
  weatherData: WeatherResponse | null;
  geolocation: IGeolocation | null;
}
