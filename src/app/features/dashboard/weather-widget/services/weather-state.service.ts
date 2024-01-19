import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IGeolocation, WeatherResponse } from '#weather-widget/models';

@Injectable()
export class WeatherStateService {
  private readonly weatherData$$ = new BehaviorSubject<WeatherResponse | null>(null);
  private readonly errorMessage$$ = new BehaviorSubject<string | null>(null);
  private readonly isLoading$$ = new BehaviorSubject<boolean>(false);

  geolocation: IGeolocation | null = null;

  setWeatherData(data: WeatherResponse | null): void {
    this.weatherData$$.next(data);
  }

  get weatherData$(): Observable<WeatherResponse | null> {
    return this.weatherData$$.asObservable();
  }

  setErrorMessage(errorMessage: string | null): void {
    this.errorMessage$$.next(errorMessage);
  }

  get errorMessage$(): Observable<string | null> {
    return this.errorMessage$$.asObservable();
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading);
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  setGeolocation(geolocation: IGeolocation | null): void {
    this.geolocation = geolocation;
  }
}
