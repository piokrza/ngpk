import { AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ContainerComponent } from '#shared/components';
import { LazyImgDirective } from '#shared/directives';
import { LayoutComponent } from '#shared/ui/layout';
import { NavigationComponent, NavigationSidebarComponent, UserInfoComponent } from '#shared/ui/navigation/components';
import { WeatherWidgetComponent } from '#shared/ui/weather-widget';

const declarations = [NavigationComponent, NavigationSidebarComponent, UserInfoComponent, LayoutComponent];
const imports = [
  ButtonModule,
  TieredMenuModule,
  ContainerComponent,
  ToggleButtonModule,
  FormsModule,
  ProgressSpinnerModule,
  ToastModule,
  ConfirmDialogModule,
  TranslateModule,
  WeatherWidgetComponent,
  LazyImgDirective,
  SkeletonModule,
  AsyncPipe,
];
const exports = [LayoutComponent];

@NgModule({ declarations, imports, exports })
export class UiModule {}
