import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';

import { WeatherResponse } from '#weather-widget/models';
import { WeatherApiService, WeatherStateService } from '#weather-widget/services';

@Injectable()
export class WeatherFacadeService {
  private readonly weatherApiService: WeatherApiService = inject(WeatherApiService);
  private readonly weatherStateService: WeatherStateService = inject(WeatherStateService);

  private readonly weatherDataKey = 'weatherData';
  private readonly defaultCityNameQuery = 'Krakow';

  public get weatherData$(): Observable<WeatherResponse | null> {
    return this.weatherStateService.weatherData$;
  }

  public get isLoading$(): Observable<boolean> {
    return this.weatherStateService.isLoading$;
  }

  public get errorMessage$(): Observable<string | null> {
    return this.weatherStateService.errorMessage$;
  }

  public loadWeatherData$(): Observable<WeatherResponse> {
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

  public loadWeatherDataByCityName$(cityName: string): Observable<WeatherResponse> {
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

  public checkGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }: GeolocationPosition) => {
        this.weatherStateService.setGeolocation({ latitude, longitude });
      });
    }
  }

  public checkWeatherData(): void {
    const weatherData = sessionStorage.getItem(this.weatherDataKey);
    weatherData && this.weatherStateService.setWeatherData(JSON.parse(weatherData));
  }
}
