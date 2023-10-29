import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { WeatherResponse } from '#features/weather/models';

@Injectable()
export class WeatherState {
  private readonly weatherData$$ = new BehaviorSubject<WeatherResponse | null>(null);
  private readonly isLoading$$ = new BehaviorSubject<boolean>(false);

  public setWeatherData(data: WeatherResponse | null): void {
    this.weatherData$$.next(data);
  }

  public get weatherData$(): Observable<WeatherResponse | null> {
    return this.weatherData$$.asObservable();
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading);
  }

  public get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }
}
