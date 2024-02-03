import { Injectable } from '@angular/core';

import { State } from '#core/abstracts';
import { WeatherWidgetStateModel } from '#weather-widget/models';

const initialState: WeatherWidgetStateModel = {
  isLoading: false,
  weatherData: null,
  errorMessage: null,
  geolocation: null,
};

@Injectable()
export class WeatherWidgetState extends State<WeatherWidgetStateModel> {
  constructor() {
    super(initialState);
  }
}
