import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { WeatherWidgetComponent } from '#features/weather';
import { WalletComponent } from '#features/web3/components';
import { ContainerComponent } from '#shared/components';
import { LayoutComponent } from '#shared/ui/layout';
import { NavigationComponent, NavigationSidebarComponent, UserInfoComponent } from '#shared/ui/navigation/components';

const declarations = [NavigationComponent, NavigationSidebarComponent, UserInfoComponent, LayoutComponent];

const imports = [
  CommonModule,
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
  WalletComponent,
];

const exports = [LayoutComponent];

@NgModule({ declarations, imports, exports })
export class UiModule {}