import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { weatherConfig } from '@ngpk/weather/constant';
import { IGeolocation, WeatherResponse } from '@ngpk/weather/model';

@Injectable()
export class WeatherApiService {
  readonly #http = inject(HttpClient);
  readonly #translateService = inject(TranslateService);

  readonly #baseUrl = weatherConfig.baseUrl;
  readonly #weatherApiKey = weatherConfig.apiKey;

  searchByCityName$(cityName: string): Observable<WeatherResponse> {
    return this.#http.get<WeatherResponse>(
      `${this.#baseUrl}?q=${cityName}&units=Metric&appid=${this.#weatherApiKey}&lang=${this.#translateService.currentLang}`
    );
  }

  seatchByGeoCords$(geolocation: IGeolocation): Observable<WeatherResponse> {
    return this.#http.get<WeatherResponse>(
      `${this.#baseUrl}?lat=${geolocation.latitude}&lon=${geolocation.longitude}&units=Metric&appid=${this.#weatherApiKey}&lang=${this.#translateService.currentLang}`
    );
  }
}
