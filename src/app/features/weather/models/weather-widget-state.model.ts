import { IGeolocation, WeatherResponse } from '#app/features/weather/models';

export interface WeatherWidgetStateModel {
  isLoading: boolean;
  errorMessage: string | null;
  weatherData: WeatherResponse | null;
  geolocation: IGeolocation | null;
}
