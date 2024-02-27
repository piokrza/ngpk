import { IGeolocation, WeatherResponse } from '#weather/models';

export interface WeatherStateModel {
  isLoading: boolean;
  errorMessage: string | null;
  weatherData: WeatherResponse | null;
  geolocation: IGeolocation | null;
}
