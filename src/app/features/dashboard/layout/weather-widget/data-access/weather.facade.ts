import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';

import { WeatherApi, WeatherState } from '#layout/weather-widget/data-access';
import { WeatherResponse } from '#layout/weather-widget/models';

@Injectable()
export class WeatherFacade {
  private readonly weatherApi: WeatherApi = inject(WeatherApi);
  private readonly weatherState: WeatherState = inject(WeatherState);

  private readonly weatherDataKey = 'weatherData';
  private readonly defaultCityNameQuery = 'Krakow';

  public get weatherData$(): Observable<WeatherResponse | null> {
    return this.weatherState.weatherData$;
  }

  public get isLoading$(): Observable<boolean> {
    return this.weatherState.isLoading$;
  }

  public get errorMessage$(): Observable<string | null> {
    return this.weatherState.errorMessage$;
  }

  public loadWeatherData$(): Observable<WeatherResponse> {
    return this.weatherState.geolocation
      ? this.weatherApi.seatchByGeoCords$(this.weatherState.geolocation).pipe(
          tap((data: WeatherResponse) => {
            this.weatherState.setWeatherData(data);
            sessionStorage.setItem(this.weatherDataKey, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        )
      : this.weatherApi.searchByCityName$(this.defaultCityNameQuery).pipe(
          tap((data: WeatherResponse) => {
            this.weatherState.setWeatherData(data);
            sessionStorage.setItem(this.weatherDataKey, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        );
  }

  public loadWeatherDataByCityName$(cityName: string): Observable<WeatherResponse> {
    this.weatherState.setErrorMessage(null);
    this.weatherState.setIsLoading(true);

    return this.weatherApi.searchByCityName$(cityName).pipe(
      tap((data: WeatherResponse) => {
        this.weatherState.setWeatherData(data);
        sessionStorage.setItem(this.weatherDataKey, JSON.stringify(data));
      }),
      catchError(({ error }): Observable<never> => {
        this.weatherState.setErrorMessage(error.message);
        return EMPTY;
      }),
      finalize((): void => this.weatherState.setIsLoading(false))
    );
  }

  public checkGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }: GeolocationPosition) => {
        this.weatherState.setGeolocation({ latitude, longitude });
      });
    }
  }

  public checkWeatherData(): void {
    const weatherData = sessionStorage.getItem(this.weatherDataKey);
    weatherData && this.weatherState.setWeatherData(JSON.parse(weatherData));
  }
}
