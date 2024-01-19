import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';

import { WeatherResponse } from '#weather-widget/models';
import { WeatherApiService, WeatherStateService } from '#weather-widget/services';

@Injectable()
export class WeatherFacadeService {
  private readonly weatherApiService = inject(WeatherApiService);
  private readonly weatherStateService = inject(WeatherStateService);

  private readonly weatherDataKey = 'weatherData';
  private readonly defaultCityNameQuery = 'Krakow';

  get weatherData$(): Observable<WeatherResponse | null> {
    return this.weatherStateService.weatherData$;
  }

  get isLoading$(): Observable<boolean> {
    return this.weatherStateService.isLoading$;
  }

  get errorMessage$(): Observable<string | null> {
    return this.weatherStateService.errorMessage$;
  }

  loadWeatherData$(): Observable<WeatherResponse> {
    return this.weatherStateService.geolocation
      ? this.weatherApiService.seatchByGeoCords$(this.weatherStateService.geolocation).pipe(
          tap((data: WeatherResponse) => {
            this.weatherStateService.setWeatherData(data);
            sessionStorage.setItem(this.weatherDataKey, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        )
      : this.weatherApiService.searchByCityName$(this.defaultCityNameQuery).pipe(
          tap((data: WeatherResponse) => {
            this.weatherStateService.setWeatherData(data);
            sessionStorage.setItem(this.weatherDataKey, JSON.stringify(data));
          }),
          catchError((): Observable<never> => EMPTY)
        );
  }

  loadWeatherDataByCityName$(cityName: string): Observable<WeatherResponse> {
    this.weatherStateService.setErrorMessage(null);
    this.weatherStateService.setIsLoading(true);

    return this.weatherApiService.searchByCityName$(cityName).pipe(
      tap((data: WeatherResponse) => {
        this.weatherStateService.setWeatherData(data);
        sessionStorage.setItem(this.weatherDataKey, JSON.stringify(data));
      }),
      catchError(({ error }): Observable<never> => {
        this.weatherStateService.setErrorMessage(error.message);
        return EMPTY;
      }),
      finalize((): void => this.weatherStateService.setIsLoading(false))
    );
  }

  checkGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }: GeolocationPosition) => {
        this.weatherStateService.setGeolocation({ latitude, longitude });
      });
    }
  }

  checkWeatherData(): void {
    const weatherData = sessionStorage.getItem(this.weatherDataKey);
    weatherData && this.weatherStateService.setWeatherData(JSON.parse(weatherData));
  }
}
