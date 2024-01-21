import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, Provider, Signal, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';

import { isWidgetOpen } from '#core/constants';
import { Nullable } from '#core/models';
import { ContainerComponent } from '#shared/components';
import { DetailsComponent } from '#weather-widget/components';
import { WeatherResponse } from '#weather-widget/models';
import { WeatherIconPipe } from '#weather-widget/pipes';
import { WeatherApiService, WeatherFacadeService, WeatherStateService } from '#weather-widget/services';

const imports = [
  CommonModule,
  InputTextModule,
  ReactiveFormsModule,
  ButtonModule,
  TranslateModule,
  DetailsComponent,
  SkeletonModule,
  WeatherIconPipe,
  ContainerComponent,
];
const providers: Provider[] = [WeatherFacadeService, WeatherApiService, WeatherStateService];

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
  private readonly destroyRef = inject(DestroyRef);
  private readonly weatherFacadeService = inject(WeatherFacadeService);

  readonly data: Signal<Nullable<WeatherResponse>> = toSignal(this.weatherFacadeService.weatherData$);
  readonly isLoading$: Observable<boolean> = this.weatherFacadeService.isLoading$;
  readonly errorMessage$: Observable<string | null> = this.weatherFacadeService.errorMessage$;

  readonly isOpen: WritableSignal<boolean> = signal(false);
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly searchCityNameControl = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.weatherFacadeService.checkWeatherData();
    this.weatherFacadeService.checkGeolocation();

    this.isOpen.update(() => JSON.parse(sessionStorage.getItem(isWidgetOpen) ?? false.toString()));
  }

  loadWeatherDataByCityName(cityName: string): void {
    cityName.length &&
      this.weatherFacadeService
        .loadWeatherDataByCityName$(cityName)
        .pipe(
          tap(() => this.searchCityNameControl.reset()),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
  }

  loadWeatherData(): void {
    this.weatherFacadeService.loadWeatherData$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  toggleDetails(): void {
    this.isOpen.set(!this.isOpen());
    sessionStorage.setItem(isWidgetOpen, JSON.stringify(this.isOpen()));
  }
}
