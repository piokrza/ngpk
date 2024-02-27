import { Injectable } from '@angular/core';

import { Store } from '#core/abstracts';
import { WeatherStateModel } from '#weather/models';

const initialState: WeatherStateModel = {
  isLoading: false,
  weatherData: null,
  errorMessage: null,
  geolocation: null,
};

@Injectable()
export class WeatherState extends Store<WeatherStateModel> {
  constructor() {
    super(initialState);
  }
}
