import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { tap } from 'rxjs';

import { isWidgetOpen } from '@ngpk/core/constant';
import { StateObject, connectState } from '@ngpk/core/util';

import { ContainerComponent } from '@ngpk/shared-ui/shared';
import { DetailsComponent } from '#weather/components';
import { WeatherStateModel } from '#weather/models';
import { WeatherIconPipe } from '#weather/pipes';
import { WeatherApiService, WeatherFacadeService } from '#weather/services';
import { WeatherState } from '#weather/state';

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
const providers = [WeatherFacadeService, WeatherApiService, WeatherState];

@Component({
  selector: 'org-weather-widget',
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export class WeatherWidgetComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly weatherFacadeService = inject(WeatherFacadeService);

  readonly state: StateObject<WeatherStateModel> = connectState(this.destroyRef, this.weatherFacadeService.state);

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly searchCityNameControl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });
  readonly isOpen: WritableSignal<boolean> = signal(JSON.parse(sessionStorage.getItem(isWidgetOpen) ?? 'false'));

  ngOnInit(): void {
    this.weatherFacadeService.checkWeatherData();
    this.weatherFacadeService.checkGeolocation();
  }

  loadWeatherDataByCityName(cityName: string): void {
    this.weatherFacadeService
      .loadWeatherDataByCityName$(cityName)
      .pipe(
        tap(() => this.searchCityNameControl.reset()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  loadWeatherData(): void {
    this.weatherFacadeService.loadWeatherData$(this.state.geolocation).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  toggleDetails(): void {
    this.isOpen.set(!this.isOpen());
    sessionStorage.setItem(isWidgetOpen, JSON.stringify(this.isOpen()));
  }
}
