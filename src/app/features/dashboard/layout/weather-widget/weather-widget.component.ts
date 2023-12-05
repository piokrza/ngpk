import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Provider, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';

import { Nullable } from '#common/models';
import { DetailsComponent } from '#layout/weather-widget/components';
import { WeatherApi, WeatherState, WeatherFacade } from '#layout/weather-widget/data-access';
import { WeatherResponse } from '#layout/weather-widget/models';
import { WeatherIconPipe } from '#layout/weather-widget/pipes';

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
  styleUrl: './weather-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export class WeatherWidgetComponent implements OnInit {
  private readonly weatherFacade: WeatherFacade = inject(WeatherFacade);

  public readonly data: Signal<Nullable<WeatherResponse>> = toSignal(this.weatherFacade.weatherData$);
  public readonly isLoading$: Observable<boolean> = this.weatherFacade.isLoading$;
  public readonly errorMessage$: Observable<string | null> = this.weatherFacade.errorMessage$;

  public isOpen: WritableSignal<boolean> = signal(false);
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly searchCityNameControl = new FormControl<string>('', { nonNullable: true });

  public ngOnInit(): void {
    this.weatherFacade.checkWeatherData();
    this.weatherFacade.checkGeolocation();
  }

  public loadWeatherDataByCityName(cityName: string): void {
    cityName.length && this.weatherFacade.loadWeatherDataByCityName$(cityName).pipe(untilDestroyed(this)).subscribe();
  }

  public loadWeatherData(): void {
    this.weatherFacade.loadWeatherData$().pipe(untilDestroyed(this)).subscribe();
  }

  public toggleDetails(): void {
    this.isOpen.set(!this.isOpen());
  }
}
