import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';

import { ObservableDictionary } from '@ngpk/core/model';
import { WeatherApiService } from '@ngpk/weather/api';
import { weatherData } from '@ngpk/weather/constant';
import { IGeolocation, WeatherResponse, WeatherStateModel } from '@ngpk/weather/model';
import { WeatherState } from '@ngpk/weather/state';

@Injectable()
export class WeatherFacadeService {
  private readonly weatherState = inject(WeatherState);
  private readonly weatherApiService = inject(WeatherApiService);

  private readonly defaultCityNameQuery = 'Krakow';

  get state(): ObservableDictionary<WeatherStateModel> {
    return {
      isLoading: this.weatherState.select('isLoading'),
      weatherData: this.weatherState.select('weatherData'),
      geolocation: this.weatherState.select('geolocation'),
      errorMessage: this.weatherState.select('errorMessage'),
    };
  }

  loadWeatherData$(geolocation: IGeolocation | null): Observable<WeatherResponse> {
    return geolocation
      ? this.weatherApiService.seatchByGeoCords$(geolocation).pipe(
          tap((data: WeatherResponse) => {
            this.weatherState.update('weatherData', data);
            sessionStorage.setItem(weatherData, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        )
      : this.weatherApiService.searchByCityName$(this.defaultCityNameQuery).pipe(
          tap((data: WeatherResponse) => {
            this.weatherState.update('weatherData', data);
            sessionStorage.setItem(weatherData, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        );
  }

  loadWeatherDataByCityName$(cityName: string): Observable<WeatherResponse> {
    this.weatherState.update('errorMessage', null);
    this.weatherState.update('isLoading', true);

    return this.weatherApiService.searchByCityName$(cityName).pipe(
      tap((data: WeatherResponse) => {
        this.weatherState.update('weatherData', data);
        sessionStorage.setItem(weatherData, JSON.stringify(data));
      }),
      catchError((err): Observable<never> => {
        this.weatherState.update('errorMessage', err);
        return EMPTY;
      }),
      finalize(() => this.weatherState.update('isLoading', false))
    );
  }

  checkGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }: GeolocationPosition) => {
        this.weatherState.update('geolocation', { latitude, longitude });
      });
    }
  }

  checkWeatherData(): void {
    const data = sessionStorage.getItem(weatherData);
    data && this.weatherState.update('weatherData', JSON.parse(data));
  }
}
