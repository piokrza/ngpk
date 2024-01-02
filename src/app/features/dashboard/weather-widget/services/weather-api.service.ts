import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IGeolocation, WeatherResponse } from '#weather-widget/models';

@Injectable()
export class WeatherApiService {
  readonly #http: HttpClient = inject(HttpClient);
  readonly #translateService: TranslateService = inject(TranslateService);

  readonly #baseUrl: string = env.weatherBaseUrl;
  readonly #weatherApiKey: string = env.weatherApiKey;

  public searchByCityName$(cityName: string): Observable<WeatherResponse> {
    return this.#http.get<WeatherResponse>(
      `${this.#baseUrl}?q=${cityName}&units=Metric&appid=${this.#weatherApiKey}&lang=${this.#translateService.currentLang}`
    );
  }

  public seatchByGeoCords$(geolocation: IGeolocation): Observable<WeatherResponse> {
    return this.#http.get<WeatherResponse>(
      `${this.#baseUrl}?lat=${geolocation.latitude}&lon=${geolocation.longitude}&units=Metric&appid=${this.#weatherApiKey}&lang=${this.#translateService.currentLang}`
    );
  }
}
