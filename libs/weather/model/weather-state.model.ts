import { IGeolocation, WeatherResponse } from '@ngpk/weather/model';

export interface WeatherStateModel {
  isLoading: boolean;
  errorMessage: string | null;
  weatherData: WeatherResponse | null;
  geolocation: IGeolocation | null;
}
