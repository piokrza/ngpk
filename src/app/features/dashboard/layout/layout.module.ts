import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { WeatherWidgetComponent } from '#dashboard/weather-widget';
import { LayoutComponent } from '#layout/.';
import { MobileMenuComponent, NavigationComponent, NavigationSidebarComponent, UserInfoComponent } from '#layout/navigation/components';
import { ContainerComponent } from '#shared/components';
import { FeatureFlagDirective } from '#shared/directives';

const declarations = [NavigationComponent, NavigationSidebarComponent, UserInfoComponent, LayoutComponent, MobileMenuComponent];
const imports = [
  ButtonModule,
  ContainerComponent,
  ToggleButtonModule,
  FormsModule,
  ProgressSpinnerModule,
  ToastModule,
  ConfirmDialogModule,
  TranslateModule,
  WeatherWidgetComponent,
  NgOptimizedImage,
  SkeletonModule,
  AsyncPipe,
  RouterLink,
  RouterLinkActive,
  FeatureFlagDirective,
];
const exports = [LayoutComponent];

@NgModule({ declarations, imports, exports })
export class LayoutModule {}
