import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, Signal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { tap } from 'rxjs';

import { StateObject, connectState } from '@ngpk/core/util';
import { ContainerComponent } from '@ngpk/shared-ui/components';
import { WeatherApiService } from '@ngpk/weather/api';
import { isWidgetOpen } from '@ngpk/weather/constant';
import { WeatherStateModel } from '@ngpk/weather/model';
import { WeatherIconPipe } from '@ngpk/weather/pipe';
import { WeatherFacadeService } from '@ngpk/weather/service';
import { DetailsComponent } from '@ngpk/weather/shared';
import { WeatherState } from '@ngpk/weather/state';

const imports = [
  CommonModule,
  ButtonModule,
  SkeletonModule,
  WeatherIconPipe,
  InputTextModule,
  TranslateModule,
  DetailsComponent,
  ContainerComponent,
  ReactiveFormsModule,
];
const providers = [WeatherFacadeService, WeatherApiService, WeatherState];

@Component({
  selector: 'ngpk-weather-widget',
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

  readonly #isOpen = signal<boolean>(JSON.parse(sessionStorage.getItem(isWidgetOpen) ?? 'false'));
  readonly isOpen: Signal<boolean> = this.#isOpen.asReadonly();

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly searchCityNameControl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });

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
    this.#isOpen.set(!this.isOpen());
    sessionStorage.setItem(isWidgetOpen, JSON.stringify(this.isOpen()));
  }
}
