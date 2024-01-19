import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IGeolocation, WeatherResponse } from '#weather-widget/models';

@Injectable()
export class WeatherApiService {
  private readonly http = inject(HttpClient);
  private readonly translateService = inject(TranslateService);

  private readonly baseUrl = env.weatherBaseUrl;
  private readonly weatherApiKey = env.weatherApiKey;

  searchByCityName$(cityName: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `${this.baseUrl}?q=${cityName}&units=Metric&appid=${this.weatherApiKey}&lang=${this.translateService.currentLang}`
    );
  }

  seatchByGeoCords$(geolocation: IGeolocation): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `${this.baseUrl}?lat=${geolocation.latitude}&lon=${geolocation.longitude}&units=Metric&appid=${this.weatherApiKey}&lang=${this.translateService.currentLang}`
    );
  }
}
