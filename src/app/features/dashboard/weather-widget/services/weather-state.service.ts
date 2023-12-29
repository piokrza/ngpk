import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IGeolocation, WeatherResponse } from '#weather-widget/models';

@Injectable()
export class WeatherStateService {
  private readonly weatherData$$ = new BehaviorSubject<WeatherResponse | null>(null);
  private readonly errorMessage$$ = new BehaviorSubject<string | null>(null);
  private readonly isLoading$$ = new BehaviorSubject<boolean>(false);

  public geolocation: IGeolocation | null = null;

  public setWeatherData(data: WeatherResponse | null): void {
    this.weatherData$$.next(data);
  }

  public get weatherData$(): Observable<WeatherResponse | null> {
    return this.weatherData$$.asObservable();
  }

  public setErrorMessage(errorMessage: string | null): void {
    this.errorMessage$$.next(errorMessage);
  }

  public get errorMessage$(): Observable<string | null> {
    return this.errorMessage$$.asObservable();
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading);
  }

  public get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  public setGeolocation(geolocation: IGeolocation | null): void {
    this.geolocation = geolocation;
  }
}
