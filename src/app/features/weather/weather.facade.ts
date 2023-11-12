import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, combineLatest, finalize, tap } from 'rxjs';

import { WeatherApi, WeatherState } from '#features/weather/data-access';
import { WeatherDataset, WeatherResponse } from '#features/weather/models';

@Injectable()
export class WeatherFacade {
  private readonly weatherApi: WeatherApi = inject(WeatherApi);
  private readonly weatherState: WeatherState = inject(WeatherState);

  private readonly weatherDataKey = 'weatherData';

  public get weatherDataset$(): Observable<WeatherDataset> {
    return combineLatest({
      data: this.weatherState.weatherData$,
      isLoading: this.weatherState.isLoading$,
    });
  }

  public checkWeather(): void {
    const weatherData = sessionStorage.getItem(this.weatherDataKey);
    weatherData && this.weatherState.setWeatherData(JSON.parse(weatherData));
  }

  public loadWeatherDataByCity$(cityName: string): Observable<WeatherResponse> {
    this.weatherState.setIsLoading(true);

    return this.weatherApi.searchByCityName$(cityName).pipe(
      tap((data: WeatherResponse) => {
        this.weatherState.setWeatherData(data);
        sessionStorage.setItem(this.weatherDataKey, JSON.stringify(data));
      }),
      catchError((): Observable<never> => EMPTY),
      finalize((): void => this.weatherState.setIsLoading(false))
    );
  }
}
