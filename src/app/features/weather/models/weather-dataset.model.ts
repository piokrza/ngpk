import { WeatherResponse } from '#features/weather/models';

export interface WeatherDataset {
  data: WeatherResponse | null;
  isLoading: boolean;
}
