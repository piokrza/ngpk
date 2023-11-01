import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';

import { WeatherFacade } from '#features/weather';
import { DetailsComponent } from '#features/weather/components';
import { WeatherApi, WeatherState } from '#features/weather/data-access';
import { WeatherDataset } from '#features/weather/models';
import { WeatherIconPipe } from '#features/weather/pipes';

const imports = [
  CommonModule,
  InputTextModule,
  ReactiveFormsModule,
  ButtonModule,
  TranslateModule,
  DetailsComponent,
  SkeletonModule,
  WeatherIconPipe,
];
const providers: Provider[] = [WeatherFacade, WeatherApi, WeatherState];

@UntilDestroy()
@Component({
  selector: 'ctrl-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export class WeatherWidgetComponent {
  private readonly weatherFacade: WeatherFacade = inject(WeatherFacade);

  public readonly dataset$: Observable<WeatherDataset> = this.weatherFacade.weatherDataset$;

  public isOpen = false;
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly searchCityNameControl = new FormControl<string>('', { nonNullable: true });

  public constructor() {
    // this.weatherFacade.loadWeatherDataByCity$('Kraków').pipe(take(1)).subscribe();
  }

  public loadWeatherDataByCityName(cityName: string): void {
    cityName.length && this.weatherFacade.loadWeatherDataByCity$(cityName).pipe(untilDestroyed(this)).subscribe();
  }

  public toggleDetails(): void {
    this.isOpen = !this.isOpen;
  }
}
