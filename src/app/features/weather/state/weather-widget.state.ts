import { Injectable } from '@angular/core';

import { Store } from '#core/abstracts';
import { WeatherWidgetStateModel } from '#weather/models';

const initialState: WeatherWidgetStateModel = {
  isLoading: false,
  weatherData: null,
  errorMessage: null,
  geolocation: null,
};

@Injectable()
export class WeatherWidgetState extends Store<WeatherWidgetStateModel> {
  constructor() {
    super(initialState);
  }
}
