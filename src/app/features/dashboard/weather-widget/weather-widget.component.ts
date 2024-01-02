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

import { isWidgetOpen } from '#common/constants';
import { Nullable } from '#common/models';
import { DetailsComponent } from '#weather-widget/components';
import { WeatherResponse } from '#weather-widget/models';
import { WeatherIconPipe } from '#weather-widget/pipes';
import { WeatherApiService, WeatherStateService, WeatherFacadeService } from '#weather-widget/services';

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
const providers: Provider[] = [WeatherFacadeService, WeatherApiService, WeatherStateService];

@UntilDestroy()
@Component({
  selector: 'org-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export class WeatherWidgetComponent implements OnInit {
  readonly #weatherFacadeService: WeatherFacadeService = inject(WeatherFacadeService);

  readonly data: Signal<Nullable<WeatherResponse>> = toSignal(this.#weatherFacadeService.weatherData$);
  readonly isLoading$: Observable<boolean> = this.#weatherFacadeService.isLoading$;
  readonly errorMessage$: Observable<string | null> = this.#weatherFacadeService.errorMessage$;

  isOpen: WritableSignal<boolean> = signal(false);
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly searchCityNameControl = new FormControl<string>('', { nonNullable: true });

  public ngOnInit(): void {
    this.#weatherFacadeService.checkWeatherData();
    this.#weatherFacadeService.checkGeolocation();

    this.isOpen.update(() => JSON.parse(sessionStorage.getItem(isWidgetOpen) ?? false.toString()));
  }

  public loadWeatherDataByCityName(cityName: string): void {
    cityName.length && this.#weatherFacadeService.loadWeatherDataByCityName$(cityName).pipe(untilDestroyed(this)).subscribe();
  }

  public loadWeatherData(): void {
    this.#weatherFacadeService.loadWeatherData$().pipe(untilDestroyed(this)).subscribe();
  }

  public toggleDetails(): void {
    this.isOpen.set(!this.isOpen());
    sessionStorage.setItem(isWidgetOpen, JSON.stringify(this.isOpen()));
  }
}
