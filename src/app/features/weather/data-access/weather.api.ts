import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { WeatherResponse } from '#features/weather/models';

@Injectable()
export class WeatherApi {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly translateService: TranslateService = inject(TranslateService);

  private readonly weatherApiKey: string = env.weatherApiKey;

  public searchByCityName$(cityName: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.getUrl(cityName));
  }

  private getUrl(cityName: string): string {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${this.weatherApiKey}&lang=${this.translateService.currentLang}`;
  }
}
