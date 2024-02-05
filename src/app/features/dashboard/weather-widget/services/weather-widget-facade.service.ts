import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';

import { weatherData } from '#core/constants';
import { ObservableDictionary } from '#core/models';
import { IGeolocation, WeatherResponse, WeatherWidgetStateModel } from '#weather-widget/models';
import { WeatherWidgetApiService } from '#weather-widget/services';
import { WeatherWidgetState } from '#weather-widget/state';

@Injectable()
export class WeatherWidgetFacadeService {
  private readonly weatherWidgetApiService = inject(WeatherWidgetApiService);
  private readonly weatherWidgetState = inject(WeatherWidgetState);

  private readonly defaultCityNameQuery = 'Krakow';

  get state(): ObservableDictionary<WeatherWidgetStateModel> {
    return {
      isLoading: this.weatherWidgetState.select('isLoading'),
      weatherData: this.weatherWidgetState.select('weatherData'),
      geolocation: this.weatherWidgetState.select('geolocation'),
      errorMessage: this.weatherWidgetState.select('errorMessage'),
    };
  }

  loadWeatherData$(geolocation: IGeolocation | null): Observable<WeatherResponse> {
    return geolocation
      ? this.weatherWidgetApiService.seatchByGeoCords$(geolocation).pipe(
          tap((data: WeatherResponse) => {
            this.weatherWidgetState.update('weatherData', data);
            sessionStorage.setItem(weatherData, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        )
      : this.weatherWidgetApiService.searchByCityName$(this.defaultCityNameQuery).pipe(
          tap((data: WeatherResponse) => {
            this.weatherWidgetState.update('weatherData', data);
            sessionStorage.setItem(weatherData, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        );
  }

  loadWeatherDataByCityName$(cityName: string): Observable<WeatherResponse> {
    this.weatherWidgetState.update('errorMessage', null);
    this.weatherWidgetState.update('isLoading', true);

    return this.weatherWidgetApiService.searchByCityName$(cityName).pipe(
      tap((data: WeatherResponse) => {
        this.weatherWidgetState.update('weatherData', data);
        sessionStorage.setItem(weatherData, JSON.stringify(data));
      }),
      catchError((err): Observable<never> => {
        this.weatherWidgetState.update('errorMessage', err);
        return EMPTY;
      }),
      finalize(() => this.weatherWidgetState.update('isLoading', false))
    );
  }

  checkGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }: GeolocationPosition) => {
        this.weatherWidgetState.update('geolocation', { latitude, longitude });
      });
    }
  }

  checkWeatherData(): void {
    const data = sessionStorage.getItem(weatherData);
    data && this.weatherWidgetState.update('weatherData', JSON.parse(data));
  }
}
